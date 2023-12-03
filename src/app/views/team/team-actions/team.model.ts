
import { Injectable } from '@angular/core';
import { TeamMember } from '../../../types/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamMembers: TeamMember[] = [];

  getTeamMembers(): TeamMember[] {
    return this.teamMembers;
  }

  addTeamMember(member: TeamMember): void {
    this.teamMembers.push(member);
  }
  deleteTeamMember(member: TeamMember): void {
    const index = this.teamMembers.findIndex((m) => m.id === member.id);
    if (index !== -1) {
      this.teamMembers.splice(index, 1);
    }
  }
}
