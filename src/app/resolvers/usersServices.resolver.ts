import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY } from 'rxjs';
import { AlertsComponent } from '../components/alerts/alerts.component';
import { getServicesAndUser } from '../conections/services/resolvers';
import { GraphqlConnectionService } from '../providers/graphql-connection/graphql-connection.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServicesResolver implements Resolve<any> {

  constructor(
    private router: Router, private _snackBar: MatSnackBar,
    private connection: GraphqlConnectionService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const query = getServicesAndUser();
    try {
      const reponse = await this.connection.post(query, true);
      return reponse;
    } catch (e) {
      this._snackBar.openFromComponent(AlertsComponent, {
        duration: 2 * 1000,
        data: { message: 'Se reporto ', type: 1 },
      });
    }
    return EMPTY;
  }
}
