import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  elRef: ElementRef;

  constructor(elef: ElementRef) {this.elRef = elef }

  ngOnInit(): void {
    return this.elRef.nativeElement.innerHTML;
  }

}
