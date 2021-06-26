import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Output()
  readonly darkModeActived = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }


}
