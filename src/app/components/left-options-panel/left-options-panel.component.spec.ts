import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftOptionsPanelComponent } from './left-options-panel.component';

describe('LeftOptionsPanelComponent', () => {
  let component: LeftOptionsPanelComponent;
  let fixture: ComponentFixture<LeftOptionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftOptionsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftOptionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
