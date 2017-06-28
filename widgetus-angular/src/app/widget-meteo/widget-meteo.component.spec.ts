import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetMeteoComponent } from './widget-meteo.component';

describe('WidgetMeteoComponent', () => {
  let component: WidgetMeteoComponent;
  let fixture: ComponentFixture<WidgetMeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetMeteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
