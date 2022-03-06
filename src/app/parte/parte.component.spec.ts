import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParteComponent } from './parte.component';

describe('ParteComponent', () => {
  let component: ParteComponent;
  let fixture: ComponentFixture<ParteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
