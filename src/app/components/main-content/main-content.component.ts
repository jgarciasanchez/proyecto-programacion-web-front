import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { AuthService } from 'src/app/services/auth.service';
import { GetUsersAndServiserOutput, UsersAndServicesData } from 'src/app/conections/services/response';
import { GetUserFriendsOutput } from 'src/app/conections/friends/response';
import { User } from 'src/app/conections/user/response';
import { IsAuthOutput } from 'src/app/conections/auth/response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsComponent } from '../alerts/alerts.component';
import { getServicesAndUser } from 'src/app/conections/services/resolvers';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
}


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  services: UsersAndServicesData[] = [];
  tiles: Tile[] = [];
  isWideScreen$: Observable<boolean>;
  authUser: boolean;
  friends: User[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    public auth: AuthService,
    private _snackBar: MatSnackBar,
    private connection: GraphqlConnectionService,) { }



  ngOnInit(): void {
    this.loadDataFromResolvers();
    this.responsiveConfig();
    this.authUser = (this.auth.isLogged() == 'true');
    for (let i = 0; i < 9; i++) {
      this.tiles.push({ cols: 1, rows: 1, color: '#ffff' },)
    }
  }

  responsiveConfig() {
    this.isWideScreen$ = this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .pipe(map(({ matches }) => matches));
  }


  loadDataFromResolvers() {
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



    const dataGetServiceFromAsync = this.route.snapshot.data.services;
    const dataGetAuthFromAsync = this.route.snapshot.data.auth;
    try {
      const { isAuth }: any = dataGetAuthFromAsync.data;
      const auth: IsAuthOutput = isAuth;
      this.auth.setAuthenticated('true');
    } catch (error) {
      this.auth.setAuthenticated('false');
    }
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
}
