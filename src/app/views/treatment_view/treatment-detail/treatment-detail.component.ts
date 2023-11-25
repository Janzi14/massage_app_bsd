import {Component, OnInit} from '@angular/core';
import {Treatment} from "../../../types/treatments";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TreatmentService} from "../../../endpoints/treatments.endpoints";
import html2PDF from "jspdf-html2canvas";
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
  hideBack?: boolean

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

  async createImage() {
    let page = document.getElementById("details-view");
    if (page) await html2PDF(page);
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const idFromRoute = routeParams.get('id');

    if (idFromRoute) this.getTreatment(idFromRoute);
  }
}


