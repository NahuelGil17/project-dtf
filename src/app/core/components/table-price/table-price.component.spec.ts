import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePriceComponent } from './table-price.component';

describe('TablePriceComponent', () => {
  let component: TablePriceComponent;
  let fixture: ComponentFixture<TablePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
