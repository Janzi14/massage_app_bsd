import {Component, EventEmitter, Output} from '@angular/core';
import {TreatmentService} from "../../../../endpoints/treatments.endpoints";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-treatment-search',
  templateUrl: './treatment-search.component.html',
  styleUrls: ['./treatment-search.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class TreatmentSearchComponent {
  @Output() filter: EventEmitter<any> = new EventEmitter();

  name?: string

  constructor(private treatmentService: TreatmentService) {
  }

  search(): void {
    this.filter.emit(this.name);
  }

  reset(): void {
    this.filter.emit();
  }
}
