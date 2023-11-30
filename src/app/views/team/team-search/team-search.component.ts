import {Component, EventEmitter, inject, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TeamMember } from '../../../types/team';
import { FormsModule } from '@angular/forms';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.css']
})
export class TeamSearchComponent {
  @Output() filter: EventEmitter<any> = new EventEmitter();
  name?: string
  teams: Array<TeamMember> = [];
  selectedTeam: TeamMember | undefined;

  private teamService = inject(TeamService);

  search(): void {
    this.filter.emit(this.name);
  }

  reset(): void {
    this.filter.emit();
  }
}


