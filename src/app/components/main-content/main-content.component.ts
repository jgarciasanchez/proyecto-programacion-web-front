import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { AuthService } from 'src/app/services/auth.service';
import { GetUsersAndServiserOutput, UsersAndServicesData } from 'src/app/conections/services/response';
import { GetUserFriendsOutput } from 'src/app/conections/friends/response';
import { User } from 'src/app/conections/user/response';
import { IsAuthOutput } from 'src/app/conections/auth/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponent } from '../alerts/alerts.component';
import { getServicesAndUser } from 'src/app/conections/services/resolvers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { isAuth } from 'src/app/conections/auth/resolver';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
}


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  services: UsersAndServicesData[] = [];
  tiles: Tile[] = [];
  isWideScreen$: Observable<boolean>;
  authUser: boolean;
  friends: User[] = [];
  searchForm: FormGroup;
  options: string[] = ['Música', 'Electrodomesticos', 'Cocina', 'Gaming', 'Limpieza', 'Viajes', 'Transporte', 'Entretenimiento', 'Mecánica'];
  filteredOptions: Observable<string[]>;

  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private connection: GraphqlConnectionService,) { }



  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      category: new FormControl(''),
      keywords: new FormControl(''),
    });

    this.filteredOptions = this.searchForm.controls['category'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.loadServicesInfo();
    this.loadFriendsInfo();
    this.responsiveConfig();
    this.authUser = (this.auth.isLogged() == 'true');
    for (let i = 0; i < 9; i++) {
      this.tiles.push({ cols: 1, rows: 1, color: '#ffff' },)
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  responsiveConfig() {
    this.isWideScreen$ = this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .pipe(map(({ matches }) => matches));
  }

  loadServicesInfo() {
    const query = getServicesAndUser();
    this.connection.postHttp(query, true).subscribe(req => {
      const { getServicesAndUser }: any = req.data;
      let { success, data }: GetUsersAndServiserOutput = getServicesAndUser;
      if (success) {
        this.services = data;
      } else {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 2 * 1000,
          data: { message: 'Hubo un problema con la carga de servicios', type: 1 },
        });
      }
    }, errr => {
      console.log(errr);
    });
  }

  loadFriendsInfo() {

    const query = isAuth();
    this.connection.postHttp(query, true).subscribe(req => {
      if (req.data.isAuth.success) {
        this.auth.setAuthenticated('true');
      } else {
        this.auth.setAuthenticated('false');
        this.auth.setToken('')
        this.auth.setCurrentId('');
        this.auth.setCurrentUserName('', '');
        this.auth.setCurrentUserRole('');
      }
    }, err => {
      console.log(err);
    });

    if (this.auth.isLogged() == 'true') {
      const dataGetFriendsFromAsync = this.route.snapshot.data.friends;
      const { getUserFriends }: any = dataGetFriendsFromAsync.data;
      const friendsList: GetUserFriendsOutput = getUserFriends;
      if (friendsList.success) {
        this.friends = friendsList.data
      } else {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 2 * 1000,
          data: { message: 'Fallo la carga de los amigos ', type: 1 },
        });
      }
    }


  }

  filter() {
    console.log(this.searchForm.controls['category'].value);
    var category: string = null;
    var keywords: string = null;

    if (this.searchForm.controls['category'].value != "") {
      category = this.searchForm.controls['category'].value;
    }
    if (this.searchForm.controls['keywords'].value != "") {
      keywords = this.searchForm.controls['keywords'].value;
    }
    const query = getServicesAndUser(keywords, category);

    this.connection.postHttp(query, true).subscribe(req => {
      const { getServicesAndUser }: any = req.data;
      let { success, data }: GetUsersAndServiserOutput = getServicesAndUser;
      if (success) {
        this.services = data;
      } else {
        this._snackBar.openFromComponent(AlertsComponent, {
          duration: 2 * 1000,
          data: { message: 'Hubo un problema con la carga de servicios', type: 1 },
        });
      }
    }, errr => {
      console.log(errr);
    });
  }

  friendProfile(friendId) {
    this.router.navigate(['home/service/' + friendId]);
  }
}
