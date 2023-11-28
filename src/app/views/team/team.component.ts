import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf} from "@angular/common";
import { TeamMember } from './team';




@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  imports: [NgForOf],
  standalone: true
})



export class TeamComponent {


  constructor(private http: HttpClient) {
  }

  teammembers?: TeamMember[]= [];

  ngOnInit(): void {
    this.http.get<TeamMember[]>('http://localhost:3000/team').subscribe(data => {
        console.log(data);
        this.teammembers = data;
      }
    );
  }



}
