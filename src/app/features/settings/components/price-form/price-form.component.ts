import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  NgModel,
} from '@angular/forms';
import { SettingsService } from '../../services/settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-price-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.css',
})
export class PriceFormComponent {
  @Input() table: { columns: string[]; rows: string[][]; id: string } = {} as {
    id: string;
    columns: string[];
    rows: string[][];
  };
  priceForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.priceForm = this.formBuilder.group({
      columns: this.formBuilder.array([]),
      rows: this.formBuilder.array([]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['table'] && this.table) {
      this.priceForm?.patchValue({
        uid: this.table.id,
        columns: this.table.columns,
        rows: this.table.rows,
      });
      this.initializeFormWithTableData();
    }
  }

  initializeFormWithTableData() {
    if (this.table.columns.length > 0) {
      const columnControls = this.table.columns.map((column) =>
        this.formBuilder.control(column)
      );
      const columnsArray = this.formBuilder.array(columnControls);
      this.priceForm.setControl('columns', columnsArray);
    }

    if (this.table.rows.length > 0) {
      const rowControls = this.table.rows.map((row) =>
        this.formBuilder.array(
          row.map((cell) => this.formBuilder.control(cell))
        )
      );
      const rowsArray = this.formBuilder.array(rowControls);
      this.priceForm.setControl('rows', rowsArray);
    }
  }

  get columnControls() {
    if (this.table.columns.length > 0) {
      return this.table.columns.map((column) =>
        this.formBuilder.control(column)
      );
    }
    return (this.priceForm?.get('columns') as FormArray).controls;
  }

  get rowControls() {
    if (this.table.rows.length > 0) {
      return this.table.rows.map((row) =>
        this.formBuilder.array(
          row.map((cell) => this.formBuilder.control(cell))
        )
      );
    }
    return (this.priceForm?.get('rows') as FormArray).controls;
  }

  newColumn() {
    if (this.priceForm && this.priceForm.get('columns') instanceof FormArray) {
      const columns = this.table.columns.map((column) => {
        return this.formBuilder.control(column);
      }) as unknown as FormArray;
      columns.push(this.formBuilder.control(''));
    } else {
      console.error(
        'priceForm is not initialized or columns is not a FormArray'
      );
    }
  }

  removeColumn(index: number) {
    const columns = this.priceForm?.get('columns') as FormArray;
    columns.removeAt(index);
  }

  newRow() {
    const rows = this.priceForm?.get('rows') as FormArray;
    const newRow = this.formBuilder.array([]);
    for (let i = 0; i < this.columnControls.length; i++) {
      newRow.push(this.formBuilder.control(''));
    }
    rows.push(newRow);
  }

  removeRow(index: number) {
    const rows = this.priceForm?.get('rows') as FormArray;
    rows.removeAt(index);
  }

  sendTable() {
    try {
      // Send table to the server
      const tableData = {
        columns: this.priceForm?.get('columns')?.value,
        rows: this.priceForm?.get('rows')?.value,
      };
      this.settingsService.createTable(tableData);
      this.toastService.success('Tabla guardada correctamente!');
    } catch (error) {
      console.error(error);
      this.toastService.error('Error al guardar la tabla');
    }
  }

  saveChanges() {
    try {
      // Send table to the server
      const tableData = {
        columns: this.priceForm?.get('columns')?.value,
        rows: this.priceForm?.get('rows')?.value,
      };
      this.settingsService.updateTable(this.table.id, tableData);
      this.toastService.success('Cambios guardados correctamente!');
    } catch (error) {
      console.error(error);
      this.toastService.error('Error al guardar los cambios');
    }
  }
}
