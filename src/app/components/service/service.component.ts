import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from 'src/app/models/serviceCreator';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  url: string;
}

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @Input()
  service: any;
  
  isWideScreen: Observable<boolean>;
  max_width: string;
  columns: string;
  
  tiles: Tile[] = [
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 3, rows: 4, color: 'lightblue' },
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 2, rows: 2, color: 'lightgreen' },
    { url: 'https://material.angular.io/assets/img/examples/shiba2.jpg', cols: 2, rows: 2, color: 'lightpink' },
  ];

  images = ['https://material.angular.io/assets/img/examples/shiba2.jpg',
    'https://material.angular.io/assets/img/examples/shiba2.jpg',
    'https://material.angular.io/assets/img/examples/shiba2.jpg']

  getImageArray() {
    const a = 3;
      if (this.images.length == 1) {
        this.tiles.push({ url: this.images[0], cols: 1, rows: 6, color: 'lightblue' });
      } else if (this.images.length == 2 ) {
        this.tiles.push({ url: this.images[0], cols: 1, rows: 6, color: 'lightblue' });
        this.tiles.push({ url: this.images[0], cols: 1, rows: 6, color: 'lightblue' });
      } else if (this.images.length == 3 ) {
        this.tiles.push({ url: this.images[0], cols: 2, rows: 4, color: 'lightblue' });
        this.tiles.push({ url: this.images[0], cols: 1, rows: 2, color: 'lightblue' });
        this.tiles.push({ url: this.images[0], cols: 1, rows: 2, color: 'lightblue' });
      } else if (this.images.length > 4 ) {
        this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
        this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
        this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
        this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
      } 
      return this.tiles;
      // else if (this.images.length == 5 ) {
      //   this.tiles.push({ url: this.images[0], cols: 3, rows: 4, color: 'lightblue' });
      //   this.tiles.push({ url: this.images[0], cols: 1, rows: 6, color: 'lightblue' });
      //   this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
      //   this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
      //   this.tiles.push({ url: this.images[0], cols: 1, rows: 3, color: 'lightblue' });
      // }
  }
  
  

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    console.log(this.service);

    if (this.breakpointObserver.isMatched('(min-width: 600px)')) {
      this.max_width = '50';
      this.columns = '5';
    } else {
      this.max_width = '100';
      this.columns = '3';
    }

    this.isWideScreen = this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .pipe(map(({ matches }) => matches));
  }

  getColums() {
    if (this.images.length == 1) {
      this.columns = '1';
    } else if (this.images.length == 2 || this.tiles.length == 3 || this.tiles.length == 4) {
      this.columns = '2';
    } else if (this.images.length >= 5) {
      this.columns = '3';
    }
  }

}
