import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Treatment} from "../../../../types/treatments";
import {NgIf} from "@angular/common";
import {TreatmentCardFormComponent} from "../treatment-card-form/treatment-card-form.component";
@Component({
  selector: 'app-treatment-card',
  templateUrl: './treatment-card.component.html',
  styleUrls: ['./treatment-card.component.css'],
  imports: [
    NgIf,
    TreatmentCardFormComponent
  ],
  standalone: true
})
export class TreatmentCardComponent {
  @Input() treatment?: Treatment;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() update: EventEmitter<any> = new EventEmitter();

  isEditing = false;


  onDelete(id:string){
      this.delete.emit(id);
  }


  startEditing() {
    this.isEditing = true;
  }

  onSave(updatedTreatment: Treatment, id:string) {
    this.update.emit({...updatedTreatment, id});
    this.isEditing = false;
  }

  onCancelEdit() {
    this.isEditing = false;
  }
}
