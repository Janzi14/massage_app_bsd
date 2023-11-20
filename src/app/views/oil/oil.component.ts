import { Component } from '@angular/core';
import {OilService} from "../../endpoints/oil.endpoints";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-oil',
  templateUrl: './oil.component.html',
  styleUrls: ['./oil.component.css'],
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class OilComponent {
  oils: Oil[] = [];

  constructor(private oilService: OilService) {}

  ngOnInit(): void {
    this.oilService.getOils().subscribe((data) => {
      console.log(data);
      this.oils = data});
  }
}
