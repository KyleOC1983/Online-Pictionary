import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreategameComponent } from './creategame.component';

describe('CreategameComponent', () => {
  let component: CreategameComponent;
  let fixture: ComponentFixture<CreategameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreategameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
