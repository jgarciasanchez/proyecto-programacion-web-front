import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  message: string;
  type: number;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    const { message } = data;
    const { type } = data;
    this.message = message;
    this.type = type;
  }

  ngOnInit(): void {
  }

}
