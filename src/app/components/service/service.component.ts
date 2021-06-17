import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { addReview, getServiceReviews, reportService } from 'src/app/conections/services/resolvers';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsComponent } from '../alerts/alerts.component';
import { StarRatingColor } from '../star-rating/star-rating.component';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  url: string;
}

class viewComment {
  comment: any;
  state: string;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @Input()
  service: any;
  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  isWideScreen: Observable<boolean>;
  max_width: string;
  columns: string;
  serviceForm: FormGroup;
  comments: viewComment[] = [];
  colorComments: string = "rgb(255, 255, 255)";
  showResponse: string = 'none';
  authUser: boolean;

  tiles: Tile[] = [
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 3, rows: 4, color: 'lightblue' },
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 2, rows: 2, color: 'lightgreen' },
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 2, rows: 2, color: 'lightpink' },
  ];

  images = ['https://material.angular.io/assets/img/examples/shiba2.jpg',
    'https://material.angular.io/assets/img/examples/shiba2.jpg',
    'https://material.angular.io/assets/img/examples/shiba2.jpg']


  constructor(private breakpointObserver: BreakpointObserver,
    private connection: GraphqlConnectionService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public auth: AuthService) { }



  ngOnInit(): void {
    this.authUser = this.auth.isAuthenticated() == 'true';
    this.serviceForm = this.formBuilder.group({
      comment: new FormControl('', [Validators.required]),
    });
    this.responsiveConfig();
  }

  responsiveConfig() {
    if (this.breakpointObserver.isMatched('(min-width: 600px)')) {
      this.max_width = '60';
      this.columns = '5';
    } else {
      this.max_width = '100';
      this.columns = '3';
    }

    this.isWideScreen = this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .pipe(map(({ matches }) => matches));

  }

  async commentService(id: string) {
    if (this.serviceForm.valid) {
      const query = addReview(parseInt(id), this.serviceForm.controls['comment'].value, this.rating);
      try {
        const response = await this.connection.post(query, true);
        this.loadComments(parseInt(id));
        this.serviceForm = this.formBuilder.group({
          comment: new FormControl('', [Validators.required]),
        })
        this.rating = 3;
      } catch (e) {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 2 * 1000,
          data: { message: 'Hubo un problema obteniendo los comentarios', type: 1 },
        });
      }
    }
  }

  getImageArray() {
    const a = 3;
    if (this.images.length == 1) {
      this.tiles.push({ url: this.images[0], cols: 1, rows: 6, color: 'lightblue' });
    } else if (this.images.length == 2) {
      this.tiles.push({ url: this.images[0], cols: 1, rows: 6, color: 'lightblue' });
      this.tiles.push({ url: this.images[0], cols: 1, rows: 6, color: 'lightblue' });
    } else if (this.images.length == 3) {
      this.tiles.push({ url: this.images[0], cols: 2, rows: 4, color: 'lightblue' });
      this.tiles.push({ url: this.images[0], cols: 1, rows: 2, color: 'lightblue' });
      this.tiles.push({ url: this.images[0], cols: 1, rows: 2, color: 'lightblue' });
    } else if (this.images.length > 4) {
      this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
      this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
      this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
      this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
    }
    return this.tiles;
  }

  async reportService(id: number) {
    const query = reportService(id);
    try {
      const reponse = await this.connection.post(query, true);

      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Se reporto de forma correcta', type: 2 },
      });
      return reponse;
    } catch (e) {
      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Hubo un fallo al reportar el servicio', type: 1 },
      });
    }
  }

  getColums() {
    if (this.images.length == 1) {
      this.columns = '1';
    } else if (this.images.length == 2 || this.tiles.length == 3 || this.tiles.length == 4) {
      this.columns = '2';
    } else if (this.images.length >= 5) {
      this.columns = '3';
    }
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }

  closed(){
    this.colorComments = 'rgb(255, 255, 255)';
  }

  async loadComments(id: number) {
    this.colorComments = 'rgb(235, 235, 235)';
    const query = getServiceReviews(id);
    try {
      const reponse = await this.connection.post(query, true);
      const { getServiceReviews }: any = reponse.data;

      getServiceReviews.data.forEach(comment => {
        this.comments.push({comment: comment, state: "none"});
      });
    } catch (e) {
      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Error cargando los comentarios Error: ' + e, type: 1 },
      });
    }
  }

  test(comment: HTMLElement){
    comment.hidden = true;
    console.log("");
    // this.showResponse = "block";
  }

}
