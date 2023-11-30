import {Component, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf} from "@angular/common";
import { TeamMember } from './team';
import {TeamService} from "../../endpoints/team.endpoints";
import { TeamSearchComponent } from '../team/team-search/team-search.component';
import {TreatmentSearchComponent} from "../treatment_view/components/treatment-search/treatment-search.component"; // Passe den Pfad entsprechend an


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['team.component.css'],
  imports: [NgForOf,
    TeamSearchComponent],
  standalone: true

})




export class TeamComponent {
  teammembers?: TeamMember[]= [];



  constructor(private http: HttpClient) {
  }



  ngOnInit(): void {
    this.http.get<TeamMember[]>('http://localhost:3000/team').subscribe(data => {
        console.log(data);
        this.teammembers = data;
      }

    );

  }

}
