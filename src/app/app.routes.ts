import { Routes } from '@angular/router';
import {TreatmentsComponent} from "./views/treatments/treatments.component";
import {TeamComponent} from "./views/team/team.component";

export const routes = [
  {path: 'treatments', component: TreatmentsComponent},
  {path: 'team', component: TeamComponent},
];
