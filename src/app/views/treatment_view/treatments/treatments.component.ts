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
        this.treatmentService.getTreatments().subscribe({
            next: (result) => {
                this.treatments = result;
            },
            error: (error) => {
                console.error('Error:', error);
            }
        });
    }
}
