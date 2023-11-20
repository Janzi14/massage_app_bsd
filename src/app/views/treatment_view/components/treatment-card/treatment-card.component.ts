import {Component, Input} from '@angular/core';
import {Treatment} from "../../../../types/treatments";
@Component({
  selector: 'app-treatment-card',
  templateUrl: './treatment-card.component.html',
  styleUrls: ['./treatment-card.component.css'],
  standalone: true
})
export class TreatmentCardComponent {
  @Input() treatment?: Treatment;
}
