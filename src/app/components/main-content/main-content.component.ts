import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAllServices } from 'src/app/conections/services/resolvers';
import { Service } from 'src/app/models/serviceCreator';
import { GraphqlConnectionService } from 'src/app/providers/graphql-connection/graphql-connection.service';
import { ServicesResolver } from 'src/app/resolvers/services.resolver';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceComponent } from '../service/service.component';
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
  services: Service[] = [];
  tiles: Tile[] = [];
  isWideScreen$: Observable<boolean>;
  authUser: boolean;

  constructor(
    private connection: GraphqlConnectionService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    public auth: AuthService) { }

  async resolveTest() {
    // var s: ServicesResolver;
    // console.log(resolve());


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
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { services: Service[] }) => {
      this.services = data.services;
    });


    this.authUser = (this.auth.isAuthenticated() == 'true');

    this.isWideScreen$ = this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .pipe(map(({ matches }) => matches));

    for (let i = 0; i < 9; i++) {
      this.tiles.push({ cols: 1, rows: 1, color: '#ffff' },)
    }
  }

}
