import {Component, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf} from "@angular/common";
import { TeamMember } from './team';
import {TeamService} from "../../endpoints/team.endpoints";
import { TeamSearchComponent } from '../team/team-search/team-search.component';




@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['team.component.css'],
  imports: [NgForOf,
    TeamSearchComponent],
  standalone: true

})




export class TeamComponent {
  teammembers?: TeamMember[] = [];


  constructor(private http: HttpClient) {
  }

  /*constructor(private teamService: TeamService) {
    this.teammembers = this.teamService.getTeam();
  }*/


  ngOnInit(): void {
    this.http.get<TeamMember[]>('http://localhost:3000/team').subscribe(data => {
        console.log(data);
        this.teammembers = data;
      }
    );

  }

 /* addTeamMember(): void {
    const newMember: TeamMember = {
      id: this.teammembers.length +1
      name: `Member ${this.teammembers.length + 1}`,
      motto: 'New Motto',
      profession: 'New Profession',
      year: new Date().getFullYear(),
    };

    this.teamService.addTeamMember(newMember);

  }*/

 /* deleteTeamMember(member: TeamMember): void {
    this.teamService.deleteTeamMember(member);
  }*/

}
