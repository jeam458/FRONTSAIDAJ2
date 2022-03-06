import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListparteComponent } from './listparte.component';

describe('ListparteComponent', () => {
  let component: ListparteComponent;
  let fixture: ComponentFixture<ListparteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListparteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListparteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
