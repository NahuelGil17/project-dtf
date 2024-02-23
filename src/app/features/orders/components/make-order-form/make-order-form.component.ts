import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-make-order-form',
  standalone: true,
  templateUrl: './make-order-form.component.html',
  styleUrl: './make-order-form.component.css',
  imports: [ReactiveFormsModule, ButtonComponent],
})
export class MakeOrderFormComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      workName: ['', Validators.required],
      mode: ['', Validators.required],
      type: ['', Validators.required],
      note: [''],
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

  sendFormValues() {
    console.log(this.form.value);
  }
}
