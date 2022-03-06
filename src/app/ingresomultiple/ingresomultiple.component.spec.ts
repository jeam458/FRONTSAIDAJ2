import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresomultipleComponent } from './ingresomultiple.component';

describe('IngresomultipleComponent', () => {
  let component: IngresomultipleComponent;
  let fixture: ComponentFixture<IngresomultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresomultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresomultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
