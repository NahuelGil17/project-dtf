import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOrderFormComponent } from './make-order-form.component';

describe('MakeOrderFormComponent', () => {
  let component: MakeOrderFormComponent;
  let fixture: ComponentFixture<MakeOrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeOrderFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
