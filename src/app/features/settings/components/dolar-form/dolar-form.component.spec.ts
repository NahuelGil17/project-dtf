/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DolarFormComponent } from './dolar-form.component';

describe('DolarFormComponent', () => {
  let component: DolarFormComponent;
  let fixture: ComponentFixture<DolarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DolarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DolarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
