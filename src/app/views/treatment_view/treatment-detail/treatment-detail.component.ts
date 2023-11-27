import {Component, OnInit} from '@angular/core';
import {Treatment} from "../../../types/treatments";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TreatmentService} from "../../../endpoints/treatments.endpoints";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-treatment-detail',
  templateUrl: './treatment-detail.component.html',
  styleUrls: ['./treatment-detail.component.css'],
  imports: [
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class TreatmentDetailComponent implements OnInit {

  treatment?: Treatment;

  constructor(private route: ActivatedRoute, private treatmentService: TreatmentService) {
  }

  getTreatment(id: string) {
    this.treatmentService.getTreatmentById(id).subscribe({
      next: (result) => {
        this.treatment = result;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  readContentOutLoud() {
    const content = document.getElementById('details-view');
    if (content && content.textContent) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = content.textContent;
      utterance.lang = 'de-DE';
      window.speechSynthesis.speak(utterance);
    }
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = routeParams.get('id');

    if (idFromRoute) this.getTreatment(idFromRoute);
  }
}


