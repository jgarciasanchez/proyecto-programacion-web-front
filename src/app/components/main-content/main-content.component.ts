import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
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

  ngOnInit(): void {

    const data = this.route.snapshot.data.services;
    this.route.data.subscribe((data: { services: Service[] }) => {
      this.services = data.services;
    });
    const { getAllServices } : any = data.data;

    this.services = getAllServices;
    

    this.authUser = (this.auth.isAuthenticated() == 'true');

    this.isWideScreen$ = this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .pipe(map(({ matches }) => matches));

    for (let i = 0; i < 9; i++) {
      this.tiles.push({ cols: 1, rows: 1, color: '#ffff' },)
    }
  }

}
