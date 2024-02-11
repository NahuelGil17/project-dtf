import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PriceTableService } from '../../services/price-table.service';

@Component({
  selector: 'app-price-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.css',
})
export class PriceFormComponent {
  priceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private priceTableService: PriceTableService
  ) {
    this.priceForm = this.formBuilder.group({
      columns: this.formBuilder.array([]),
      rows: this.formBuilder.array([]),
    });
  }

  get columnControls() {
    return (this.priceForm.get('columns') as FormArray).controls;
  }

  get rowControls() {
    return (this.priceForm.get('rows') as FormArray).controls;
  }

  newColumn() {
    const columns = this.priceForm.get('columns') as FormArray;
    columns.push(this.formBuilder.control(''));
  }

  newRow() {
    const rows = this.priceForm.get('rows') as FormArray;
    const newRow = this.formBuilder.array([]);
    for (let i = 0; i < this.columnControls.length; i++) {
      newRow.push(this.formBuilder.control(''));
    }
    rows.push(newRow);
  }

  sendTable() {
    // Send table another component
    const tableData = {
      columns: this.priceForm.get('columns')?.value,
      rows: this.priceForm.get('rows')?.value,
    };
    this.priceTableService.setTableData(tableData);
  }
}
