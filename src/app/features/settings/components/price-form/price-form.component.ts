import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Input, SimpleChanges, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Actions, Select, Store, ofActionSuccessful } from '@ngxs/store';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { TableSend } from '../../interfaces/settings.interface';
import {
  CreateTable,
  CreateValueDolar,
  RemoveTable,
  UpdateTable,
  UpdateValueDolar,
} from '../../state/setting.action';
import { SettingsState } from '../../state/setting.state';

@Component({
  selector: 'app-price-form',
  standalone: true,
  templateUrl: './price-form.component.html',
  styleUrl: './price-form.component.css',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    NgClass,
    LoadingComponent,
    AsyncPipe,
  ],
})
export class PriceFormComponent {
  @Input() table: { columns: string[]; rows: string[][]; id: string } = {} as {
    id: string;
    columns: string[];
    rows: string[][];
  };
  @Input() valueDolarInput: { value: number; id: string } = {} as {
    value: number;
    id: string;
  };
  @Select(SettingsState.settingsLoading) loading$!: Observable<boolean>;
  nameButton: string = '';
  priceForm!: FormGroup;
  valueDolar!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private actions: Actions,
    private store: Store
  ) {}

  ngOnInit() {
    this.priceForm = this.formBuilder.group({
      columns: this.formBuilder.array([]),
      rows: this.formBuilder.array([]),
    });
    this.valueDolar = this.formBuilder.group({
      value: this.formBuilder.control(''),
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
    if (this.valueDolarInput.value > 0) {
      this.valueDolar.patchValue({
        value: this.valueDolarInput.value,
      });
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

  changeValueDolar() {
    if (this.valueDolar.valid) {
      if (this.valueDolarInput.id) {
        const valueData = {
          valueDolar: this.valueDolar.value.value,
          id: this.valueDolarInput.id,
        };
        this.store.dispatch(new UpdateValueDolar(valueData));
        this.actions
          .pipe(ofActionSuccessful(UpdateValueDolar))
          .subscribe(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Valor del dolar actualizado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else {
        const valueData = {
          value: this.valueDolar.value.value,
        };
        this.store.dispatch(new CreateValueDolar(valueData));
        this.actions
          .pipe(ofActionSuccessful(UpdateValueDolar))
          .subscribe(() => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Valor del dolar actualizado con éxito',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    }
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
        const tableData: TableSend = {
          table: {
            columns: this.priceForm?.get('columns')?.value,
            rows: this.priceForm?.get('rows')?.value,
          },
        };
        this.store.dispatch(new CreateTable(tableData));
        this.actions.pipe(ofActionSuccessful(CreateTable)).subscribe(() => {});
      } catch (error) {
        console.error(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al guardar la tabla',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    // Si llega un id de la tabla la actualiza
    else {
      try {
        // Send table to the server
        const tableData = {
          id: this.table.id,
          table: {
            columns: this.priceForm?.get('columns')?.value,
            rows: this.priceForm?.get('rows')?.value,
          },
        };
        this.store.dispatch(new UpdateTable(tableData));
        this.actions.pipe(ofActionSuccessful(UpdateTable)).subscribe(() => {});
      } catch (error) {
        console.error(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al guardar la tabla',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }

  deleteTable() {
    try {
      this.store.dispatch(new RemoveTable(this.table.id));
      this.actions.pipe(ofActionSuccessful(RemoveTable)).subscribe(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tabla eliminada con éxito',
          showConfirmButton: false,
          timer: 1500,
        });
      });
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
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al eliminar la tabla',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
