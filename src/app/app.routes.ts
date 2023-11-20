import { Routes } from '@angular/router';
import {TreatmentsComponent} from "./views/treatments/treatments.component";
import {OilComponent} from "./views/oil/oil.component";

export const routes = [
  {path: 'treatments', component: TreatmentsComponent},
  {path: 'oil', component: OilComponent},
];
