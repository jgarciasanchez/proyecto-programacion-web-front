import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY } from 'rxjs';
import { addReview } from '../conections/services/resolvers';
import { GraphqlConnectionService } from '../providers/graphql-connection/graphql-connection.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsResolver implements Resolve<any> {

  constructor(
    private router: Router,
    private connection: GraphqlConnectionService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const query = getServiceReviews();
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
