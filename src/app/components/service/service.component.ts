import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { addReview, getServiceReviews, reportService, responseReview } from 'src/app/conections/services/resolvers';
import { GetResponseCommentOutput } from 'src/app/conections/services/response';
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
  commentForm: FormGroup;
  responseForm: FormGroup;
  comments: viewComment[] = [];
  colorComments: string = "rgb(255, 255, 255)";
  showResponse: string = 'none';
  authUser: boolean;

  tiles: Tile[] = [
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 3, rows: 4, color: 'lightblue' },
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 2, rows: 2, color: 'lightgreen' },
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 2, rows: 2, color: 'lightpink' },
  ];

  constructor(private breakpointObserver: BreakpointObserver,
    private connection: GraphqlConnectionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    public auth: AuthService) { }



  ngOnInit(): void {
    console.log(this.service);
    
    this.authUser = this.auth.isLogged() == 'true';
    this.commentForm = this.formBuilder.group({
      comment: new FormControl('', [Validators.required]),
    });
    this.responseForm = this.formBuilder.group({
      commentResponse: new FormControl('', [Validators.required]),
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
    var Filter = require('bad-words'), filter = new Filter();
    var filter = new Filter();
    var newBadWords = ['carepicha', 'playo', 'malparido', 'muerase'];
    filter.addWords(...newBadWords);

    if (this.commentForm.valid) {
      if (this.commentForm.controls['comment'].value == filter.clean(this.commentForm.controls['comment'].value)) {
        const query = addReview(parseInt(id), this.commentForm.controls['comment'].value, this.rating);
        try {
          const response = await this.connection.post(query, true);
          this.loadComments(parseInt(id));
          this.commentForm.controls['comment'].setValue("");
          this.rating = 3;
        } catch (e) {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 2 * 1000,
            data: { message: 'Hubo un problema obteniendo los comentarios', type: 1 },
          });
        }
      } else {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 4 * 1000,
          data: { message: 'No se publico el servicio ya que tu comentario incumple nuestras politicas de lenguaje apropiado', type: 1 },
        });
      }

    }
  }

  responseComment(commentId, serviceId) {
    var Filter = require('bad-words'), filter = new Filter();
    var filter = new Filter();
    var newBadWords = ['carepicha', 'playo', 'malparido', 'muerase'];
    filter.addWords(...newBadWords);

    if (this.responseForm.valid) {
      if (this.responseForm.controls['commentResponse'].value == filter.clean(this.responseForm.controls['commentResponse'].value)) {
        const query = responseReview(parseInt(commentId), this.responseForm.controls['commentResponse'].value);
        try {
          this.connection.postHttp(query, true).subscribe(req => {
            console.log(req);

          }, err => {
            console.log(err);

          });
          this.loadComments(parseInt(serviceId));
          this.responseForm.controls['commentResponse'].setValue("");
        } catch (e) {
          this._snackBar.openFromComponent(AlertsComponent, {
            duration: 2 * 1000,
            data: { message: 'Hubo un problema obteniendo los comentarios', type: 1 },
          });
        }
      } else {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 4 * 1000,
          data: { message: 'No se publico el servicio ya que tu comentario incumple nuestras politicas de lenguaje apropiado', type: 1 },
        });
      }
    }
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

  showProfile(id) {
    this.router.navigate(['home', 'service', id]);
  }

  onRatingChanged(rating) {
    this.rating = rating;
  }

  closed() {
    this.colorComments = 'rgb(255, 255, 255)';
  }

  async loadComments(id: number) {
    console.log(this.service);

    this.comments = [];
    this.colorComments = 'rgb(235, 235, 235)';
    const query = getServiceReviews(id);
    try {
      const reponse = await this.connection.post(query, true);
      const { getServiceReviews }: any = reponse.data;

      getServiceReviews.data.forEach(comment => {
        this.comments.push({ comment: comment, state: "none" });
      });
    } catch (e) {
      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Error cargando los comentarios Error: ' + e, type: 1 },
      });
    }
  }

  test(comment: HTMLElement) {
    comment.hidden = true;
    console.log("");
    // this.showResponse = "block";
  }

}
