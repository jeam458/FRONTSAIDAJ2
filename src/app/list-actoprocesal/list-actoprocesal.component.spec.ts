import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActoprocesalComponent } from './list-actoprocesal.component';

describe('ListActoprocesalComponent', () => {
  let component: ListActoprocesalComponent;
  let fixture: ComponentFixture<ListActoprocesalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActoprocesalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActoprocesalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
