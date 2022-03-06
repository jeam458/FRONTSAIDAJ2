import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoparteComponent } from './list-tipoparte.component';

describe('ListTipoparteComponent', () => {
  let component: ListTipoparteComponent;
  let fixture: ComponentFixture<ListTipoparteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoparteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoparteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
