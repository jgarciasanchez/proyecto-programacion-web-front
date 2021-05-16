import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY } from 'rxjs';
import { getUserFriends } from '../conections/user/resolver';
import { GraphqlConnectionService } from '../providers/graphql-connection/graphql-connection.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsResolver implements Resolve<any> {

  constructor(
    private router: Router,
    private connection: GraphqlConnectionService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const query = getUserFriends();
    try {
        const reponse =   await this.connection.post(query, true);
        console.log();
        return reponse;
    } catch (e) {
      console.log("fallo");
    }
    return EMPTY;
  }
}
