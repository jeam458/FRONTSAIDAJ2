import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignartareaComponent } from './asignartarea.component';

describe('AsignartareaComponent', () => {
  let component: AsignartareaComponent;
  let fixture: ComponentFixture<AsignartareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignartareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignartareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
