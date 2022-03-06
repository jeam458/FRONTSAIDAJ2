import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoparteComponent } from './tipoparte.component';

describe('TipoparteComponent', () => {
  let component: TipoparteComponent;
  let fixture: ComponentFixture<TipoparteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoparteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoparteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
