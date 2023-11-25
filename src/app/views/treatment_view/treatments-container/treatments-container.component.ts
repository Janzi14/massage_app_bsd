import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TreatmentDetailComponent} from "../treatment-detail/treatment-detail.component";

@Component({
  selector: 'app-treatments-container',
  templateUrl: './treatments-container.component.html',
  styleUrls: ['./treatments-container.component.css'],
  imports: [
    RouterOutlet,
    TreatmentDetailComponent
  ],
  standalone: true
})
export class TreatmentsContainerComponent {

}
