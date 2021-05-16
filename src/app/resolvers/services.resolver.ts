import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { empty } from 'rxjs/internal/observable/empty';
import { catchError } from 'rxjs/operators';
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

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const query = getAllServices();
    console.log(query);
    try {
      return await this.connection.post(query, true);
      // console.log(response);
      // if (response) {
      //   return response;
      //   const service: any = of(response);
      //   if (service) {
      //      return  of(service);
      //     const observable = Observable.create((observer) => {
      //       observer.next(service);
      //       observer.complete();
      //     });
      //     return observable.pipe(
      //       catchError((error) => {
      //         return EMPTY;
      //       }));
      //   } else {
      //     console.log("fallo");
      //   }
      // } else {
      //   console.log("fallo");
      // }
    } catch (e) {
      console.log("fallo");
    }
    return EMPTY;
  }
}
