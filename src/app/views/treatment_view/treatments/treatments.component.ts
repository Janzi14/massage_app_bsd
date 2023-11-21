import {Component} from '@angular/core';
import {TreatmentService} from "../../../endpoints/treatments.endpoints";
import {NgForOf, NgIf} from "@angular/common";
import {Treatment} from "../../../types/treatments";
import {TreatmentCardComponent} from "../components/treatment-card/treatment-card.component";
import {TreatmentCardFormComponent} from "../components/treatment-card-form/treatment-card-form.component";

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css'],
  imports: [
    NgForOf,
    TreatmentCardComponent,
    NgIf,
    TreatmentCardFormComponent
  ],
  standalone: true
})
export class TreatmentsComponent {
  treatments?: Treatment[];
  isAdding = false;


  constructor(private treatmentService: TreatmentService) {
  }

  ngOnInit(): void {
    this.getTreatments()
  }

  getTreatments() {
    this.treatmentService.getTreatments().subscribe({
      next: (result) => {
        this.treatments = result;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  onDelete(id: string) {
    const confirmed = window.confirm("Möchtest du diese Behandlung wirklich löschen");
    if (confirmed) this.treatmentService.deleteTreatment(id).subscribe({
      next: () => this.getTreatments(),
      error: error => {
        alert("Es ist ein Fehler aufgetreten!");
        console.error(error);
      },
    });
  }

  onUpdate(treatment: Treatment) {
    const confirmed = window.confirm("Möchtest du diese Behandlung wirklich ändern");
    if (confirmed) this.treatmentService.updateTreatment(treatment).subscribe({
      next: () => this.getTreatments(),
      error: error => {
        alert("Es ist ein Fehler aufgetreten!");
        console.error(error);
      },
    });
  }

  onAdd(treatment: Treatment) {
    const id = "id" + Math.random().toString(16).slice(2);
    this.treatmentService.addTreatment({...treatment, id}).subscribe({
      next: () => {
        this.getTreatments()
        this.isAdding = false;
      },
      error: error => {
        alert("Es ist ein Fehler aufgetreten!");
        console.error(error);
      },
    });
  }
}
