import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Treatment} from "../../../../types/treatments";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-treatment-card-form',
  templateUrl: './treatment-card-form.component.html',
  styleUrls: ['./treatment-card-form.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class TreatmentCardFormComponent {
  @Input() treatment?: Treatment;
  @Output() save = new EventEmitter<Treatment>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.treatment?.name, Validators.required),
      description: new FormControl(this.treatment?.description),
      price_in_euro: new FormControl(this.treatment?.price_in_euro),
      body_part: new FormControl(this.treatment?.body_part),
      available: new FormControl(this.treatment?.available|| false),
    });
  }

  onSubmit() {
    if (this.form?.valid) this.save.emit(this.form.value);

  }

  onCancel() {
    this.cancel.emit();
  }
}
