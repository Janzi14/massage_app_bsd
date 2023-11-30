import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamMember } from '../../../types/team';
import { DefaultTeamService } from './default-team.service';

@Injectable({
  providedIn: 'root',
  useClass: DefaultTeamService,
})
export abstract class TeamService {
  abstract find(from: string, to: string): Observable<TeamMember[]>;
}
