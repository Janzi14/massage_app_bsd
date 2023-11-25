import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Treatment} from "../../../../types/treatments";
import {NgForOf, NgIf} from "@angular/common";
import {TreatmentValidators} from "../../../../validators/treatments";

@Component({
  selector: 'app-treatment-card-form',
  templateUrl: './treatment-card-form.component.html',
  styleUrls: ['./treatment-card-form.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
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
      name: new FormControl(this.treatment?.name, TreatmentValidators.wordLengthValidator(3, 50, "Name")),
      description: new FormControl(this.treatment?.description, TreatmentValidators.wordLengthValidator(3, 100, "Beschreibung")),
      price_in_euro: new FormControl(this.treatment?.price_in_euro, TreatmentValidators.priceRangeValidator()),
      body_part: new FormControl(this.treatment?.body_part, TreatmentValidators.wordLengthValidator(3, 30, "Körperteil")),
      available: new FormControl(this.treatment?.available || false),
    });
  }

  onSubmit() {
    if (this.form?.valid) this.save.emit(this.form.value);

  }

  onCancel() {
    this.cancel.emit();
  }

  protected readonly Object = Object;
}
