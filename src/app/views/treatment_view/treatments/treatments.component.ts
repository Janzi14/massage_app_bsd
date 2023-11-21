import {Component} from '@angular/core';
import {TreatmentService} from "../../../endpoints/treatments.endpoints";
import {NgForOf} from "@angular/common";
import {Treatment} from "../../../types/treatments";
import {TreatmentCardComponent} from "../components/treatment-card/treatment-card.component";

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.css'],
  imports: [
    NgForOf,
    TreatmentCardComponent
  ],
  standalone: true
})
export class TreatmentsComponent {
  treatments?: Treatment[];

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
    const index = this.treatments?.findIndex((treatment) => treatment.id === id)
    if (index) {
      this.treatmentService.deleteTreatment(id).subscribe({
        next: data => {
          this.getTreatments();
          alert('Erfolgreich gelöscht');
        },
        error: error => {
          alert("Es ist ein Fehler aufgetreten!");
          console.error(error);
        },
      });
    }
  }
}
