import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewworkComponent } from './newwork.component';

describe('NewworkComponent', () => {
  let component: NewworkComponent;
  let fixture: ComponentFixture<NewworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
