import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TeamMember} from "../types/team";

@Injectable({providedIn: 'root'})
export class TeamService {
  private url = "http://localhost:3000/team";

  constructor(private http: HttpClient) {
  }

  getTeam(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.url}`)
  }

  getTeamById(id: string): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${this.url}/${id}`)
  }

 /* deleteTreatment(id: string) {
    return this.http.delete(`${this.url}/${id}`)
  }

  updateTeam(treatment: TeamMember) {
    return this.http.patch(`${this.url}/${teammember.id}`, treatment)
  }

  addTeam(treatment: TeamMember) {
    return this.http.post(`${this.url}`, team)
  }*/

}
