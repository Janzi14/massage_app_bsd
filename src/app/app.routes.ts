import {TreatmentsComponent} from "./views/treatment_view/treatments_overview/treatments.component";
import {TreatmentDetailComponent} from "./views/treatment_view/treatment-detail/treatment-detail.component";
import {TreatmentsContainerComponent} from "./views/treatment_view/treatments-container/treatments-container.component";
import {TeamComponent} from "./views/team/team.component";
import {OilComponent} from "./views/oil/oil.component";
import {CreateOilComponent} from "./views/oil/create-oil/create-oil.component";

export const routes = [
  {
    path: 'treatments', component: TreatmentsContainerComponent,
    children: [
      {path: '', component: TreatmentsComponent},
      {path: 'details/:id', component: TreatmentDetailComponent}
    ]
  },
  {path: 'team', component: TeamComponent},
  {path: 'oil', component: OilComponent},
  {path: 'oil/create-oil', component: CreateOilComponent},
  {path: '', redirectTo: '/oil', pathMatch: 'full' as 'full'}
];
