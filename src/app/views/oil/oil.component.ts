import {Component} from '@angular/core';
import {OilService} from "../../endpoints/oil.endpoints";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-oil',
  templateUrl: './oil.component.html',
  styleUrls: ['./oil.component.css'],
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  standalone: true
})
export class OilComponent {
  oils: Oil[] = [];
  activeOil?: Oil;
  isEditingModeActive: boolean = false;

  constructor(private oilService: OilService) {
  }

  ngOnInit(): void {
    this.oilService.getOils().subscribe(data => {
      console.log(data);
      this.oils = data
    });
  }

  updateOil(oil?: Oil): void {
    if (oil != null) {
      this.oilService.updateOil(oil);
    }
  }

  setActiveOil(oil: Oil): void {
    this.activeOil = oil;
  }

  setEditingModeActive(isEditingModeActive: boolean): void {
    this.isEditingModeActive = isEditingModeActive;
  }
}
