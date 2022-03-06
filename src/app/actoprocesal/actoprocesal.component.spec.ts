import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActoprocesalComponent } from './actoprocesal.component';

describe('ActoprocesalComponent', () => {
  let component: ActoprocesalComponent;
  let fixture: ComponentFixture<ActoprocesalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActoprocesalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActoprocesalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
