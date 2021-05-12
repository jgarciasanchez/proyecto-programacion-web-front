import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
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
  tiles: Tile[] = [

  ];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++) {
      this.tiles.push({ cols: 1, rows: 1, color: '#ffff' },)
    }
  }

}
