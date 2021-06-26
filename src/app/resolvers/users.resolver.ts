import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY } from 'rxjs';
import { AlertsComponent } from '../components/alerts/alerts.component';
import { getAllUsers } from '../conections/user/resolver';
import { GraphqlConnectionService } from '../providers/graphql-connection/graphql-connection.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<any> {

  constructor(
    private router: Router, private _snackBar: MatSnackBar,
    private connection: GraphqlConnectionService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const query = getAllUsers();
    console.log(query);
    
    try {
      const reponse = await this.connection.post(query, true);
      return reponse;
    } catch (e) {
      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Error obteniendo los datos de usuarios ', type: 1 },
      });
    }
    return EMPTY;
  }
}
