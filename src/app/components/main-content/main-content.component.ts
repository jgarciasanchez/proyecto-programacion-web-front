import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  tiles: Tile[] = [];
  isWideScreen$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    if (this.breakpointObserver.isMatched([Breakpoints.Small])) {
      console.log('is');
    }

    this.isWideScreen$ = this.breakpointObserver
    .observe(['(min-width: 600px)'])
    .pipe(map(({ matches }) => matches));


    for (let i = 0; i < 9; i++) {
      this.tiles.push({ cols: 1, rows: 1, color: '#ffff' },)
    }
  }

}
