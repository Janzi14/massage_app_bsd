import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamMember } from '../../../types/team';
import { ConfigService } from '../shared/config.service';
import { TeamService } from './team.service';

@Injectable()
export class DefaultTeamService implements TeamService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);

  find(from: string, to: string): Observable<TeamMember[]> {
    const url = `${this.configService.config.baseUrl}/team`;

    const headers = {
      Accept: 'application/json',
    };

    const params = { from, to };

    return this.http.get<TeamMember[]>(url, { headers, params });
  }
}
