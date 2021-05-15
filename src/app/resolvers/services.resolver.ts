import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { getAllServices } from '../conections/services/resolvers';
import { Service } from '../models/serviceCreator';
import { GraphqlConnectionService } from '../providers/graphql-connection/graphql-connection.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesResolver implements Resolve<Service[]> {

  constructor(
    private router: Router,
    private connection: GraphqlConnectionService) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

    const query = getAllServices();
    console.log(query);
    try {
      const response = await this.connection.post(query, true);
      console.log(response);
      if (response) {
        const service: any = response;
        if (service) {
          return service;
        } else {
          console.log("fallo");
        }
      } else {
        console.log("fallo");
      }
    } catch (e) {
      console.log("fallo");
    }
    return null;
  }
}
