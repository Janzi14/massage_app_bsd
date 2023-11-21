import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Treatment} from "../../../../types/treatments";
@Component({
  selector: 'app-treatment-card',
  templateUrl: './treatment-card.component.html',
  styleUrls: ['./treatment-card.component.css'],
  standalone: true
})
export class TreatmentCardComponent {
  @Input() treatment?: Treatment;
  @Output() delete: EventEmitter<any> = new EventEmitter();


  onDelete(id:string){
      this.delete.emit(id); // Emit the event
  }
}
