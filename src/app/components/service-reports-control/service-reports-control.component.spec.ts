import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReportsControlComponent } from './service-reports-control.component';

describe('ServiceReportsControlComponent', () => {
  let component: ServiceReportsControlComponent;
  let fixture: ComponentFixture<ServiceReportsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceReportsControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceReportsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
