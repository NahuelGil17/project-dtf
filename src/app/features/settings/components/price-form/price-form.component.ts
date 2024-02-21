import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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
  nameButton: string = '';
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

  changeTitleButton() {
    this.nameButton = this.table.id.length > 0 ? 'Actualizar' : 'Guardar';
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
    this.changeTitleButton();
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
    let columns = this.priceForm?.get('columns') as FormArray;
    return columns.controls;
  }

  get rowControls() {
    let rows = this.priceForm?.get('rows') as FormArray;
    return rows.controls;
  }

  newColumn() {
    if (
      this.priceForm &&
      this.priceForm.get('columns') instanceof FormArray &&
      this.priceForm.get('rows') instanceof FormArray
    ) {
      const columns = this.priceForm.get('columns') as FormArray;
      const rows = this.priceForm.get('rows') as FormArray;

      // Agrega una nueva columna
      columns.push(this.formBuilder.control(''));

      // Agrega una nueva celda a cada fila para la nueva columna
      rows.controls.forEach((row) => {
        (row as FormArray).push(this.formBuilder.control(''));
      });
    } else {
      console.error(
        'priceForm is not initialized or columns/rows is not a FormArray'
      );
    }
  }

  removeColumn(index: number) {
    if (
      this.priceForm &&
      this.priceForm.get('columns') instanceof FormArray &&
      this.priceForm.get('rows') instanceof FormArray
    ) {
      const columns = this.priceForm.get('columns') as FormArray;
      const rows = this.priceForm.get('rows') as FormArray;

      // Elimina la columna
      columns.removeAt(index);

      // Elimina la celda correspondiente de cada fila
      rows.controls.forEach((row) => {
        (row as FormArray).removeAt(index);
      });
    } else {
      console.error(
        'priceForm is not initialized or columns/rows is not a FormArray'
      );
    }
  }

  newRow() {
    if (this.priceForm && this.priceForm.get('rows') instanceof FormArray) {
      const rows = this.priceForm.get('rows') as FormArray;
      const rowControls = this.priceForm
        .get('columns')
        ?.value.map(() => this.formBuilder.control(''));
      rows.push(this.formBuilder.array(rowControls));
    } else {
      console.error('priceForm is not initialized or rows is not a FormArray');
    }
  }

  removeRow(index: number) {
    if (this.priceForm && this.priceForm.get('rows') instanceof FormArray) {
      const rows = this.priceForm.get('rows') as FormArray;
      rows.removeAt(index);
    } else {
      console.error('priceForm is not initialized or rows is not a FormArray');
    }
  }

  sendTable() {
    //Envia la tabla nueva al servidor
    if (!(this.table.id.length > 0)) {
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
    // Si llega un id de la tabla la actualiza
    else {
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

  deleteTable() {
    try {
      this.settingsService.removeTable(this.table.id);
      this.priceForm.reset();

      // Obtén los FormArray para 'columns' y 'rows'
      const columns = this.priceForm.get('columns') as FormArray;
      const rows = this.priceForm.get('rows') as FormArray;

      // Limpia los FormArray
      while (columns.length) {
        columns.removeAt(0);
      }
      while (rows.length) {
        rows.removeAt(0);
      }

      this.table = { id: '', columns: [], rows: [] };
      this.changeTitleButton();
      this.toastService.success('Tabla eliminada correctamente!');
    } catch (error) {
      console.error(error);
      this.toastService.error('Error al eliminar la tabla');
    }
  }
}
