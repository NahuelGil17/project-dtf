import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { OrderType } from '../../../../shared/enums/order-type.enum';
@Component({
  selector: 'app-make-order-form',
  standalone: true,
  templateUrl: './make-order-form.component.html',
  styleUrl: './make-order-form.component.css',
  imports: [ReactiveFormsModule, ButtonComponent],
})
export class MakeOrderFormComponent {
  typesEnum = OrderType;
  TYPE_VALUES = [
    { value: this.typesEnum.DTF_TEXTIL, label: 'DTF Textil' },
    { value: this.typesEnum.DTF_UV, label: 'DTF UV' },
  ];
  form!: FormGroup;
  @Input() isLoading: boolean | null = false;
  @Output() formValues = new EventEmitter();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      workName: ['', Validators.required],
      mode: [null, Validators.required],
      type: [null, Validators.required],
      note: new FormControl(''),
      filesCount: [
        '1',
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
      files: this.fb.array([this.createFile()]),
    });
  }

  get files(): FormArray {
    return this.form.controls['files'] as FormArray;
  }

  createFile(): FormGroup {
    return this.fb.group({
      file: ['', Validators.required],
      count: ['1', Validators.required],
    });
  }

  getFormGroup(i: number): FormGroup {
    return this.files.controls[i] as FormGroup;
  }

  updateFiles() {
    const filesCount = this.form.value.filesCount || 0;
    while (this.files.length < filesCount) {
      this.files.push(this.createFile());
    }
    while (this.files.length > filesCount) {
      this.files.removeAt(this.files.length - 1);
    }
  }

  onFileSelected(index: number, event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.getFormGroup(index).patchValue({ file });
    }
  }

  sendFormValues() {
    this.form.value.mode = Number(this.form.value.mode);
    this.form.value.type = Number(this.form.value.type);
    this.form.value.workName = this.form.value.workName.toLowerCase();
    this.formValues.emit(this.form.value);
  }
}
