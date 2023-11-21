import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
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
      name: new FormControl(this.treatment?.name || ''),
      description: new FormControl(this.treatment?.description || ''),
      price_in_euro: new FormControl(this.treatment?.price_in_euro || 0),
      body_part: new FormControl(this.treatment?.body_part || ''),
      available: new FormControl(this.treatment?.available || false),
    });
  }

  onSubmit() {
    if (this.form?.valid) {
      this.save.emit(this.form.value);
      console.log(this.form.value);
    }
  }

  onCancel() {
    // Emit cancel event
    this.cancel.emit();
  }
}
