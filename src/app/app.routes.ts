import {TreatmentsComponent} from "./views/treatments/treatments.component";
import {OilComponent} from "./views/oil/oil.component";
import {CreateOilComponent} from "./views/oil/create-oil/create-oil.component";

export const routes = [
  {path: 'treatments', component: TreatmentsComponent},
  {path: 'oil', component: OilComponent},
  {path: 'oil/create-oil', component: CreateOilComponent},
];
