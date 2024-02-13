import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  NgModel,
} from '@angular/forms';
import { SettingsService } from '../../serices/settings.service';

@Component({
  selector: 'app-price-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.css',
})
export class PriceFormComponent {
  @Input() table: { columns: string[]; rows: string[][] } = {} as {
    columns: string[];
    rows: string[][];
  };
  priceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService
  ) {
    this.priceForm = this.formBuilder.group({
      columns: this.formBuilder.array([]),
      rows: this.formBuilder.array([]),
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['table'] && this.table) {
  //     this.priceForm.patchValue({
  //       columns: this.table.columns,
  //       rows: this.table.rows,
  //     });
  //   }
  // }

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

  removeColumn(index: number) {
    const columns = this.priceForm.get('columns') as FormArray;
    columns.removeAt(index);
  }

  newRow() {
    const rows = this.priceForm.get('rows') as FormArray;
    const newRow = this.formBuilder.array([]);
    for (let i = 0; i < this.columnControls.length; i++) {
      newRow.push(this.formBuilder.control(''));
    }
    rows.push(newRow);
  }

  removeRow(index: number) {
    const rows = this.priceForm.get('rows') as FormArray;
    rows.removeAt(index);
  }

  sendTable() {
    // Send table another component
    const tableData = {
      columns: this.priceForm.get('columns')?.value,
      rows: this.priceForm.get('rows')?.value,
    };
    this.settingsService.createTable(tableData);
  }
}
