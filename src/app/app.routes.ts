import {TreatmentsComponent} from "./views/treatment_view/treatments/treatments.component";
import {TreatmentDetailComponent} from "./views/treatment_view/treatment-detail/treatment-detail.component";
import {TreatmentsContainerComponent} from "./views/treatment_view/treatments-container/treatments-container.component";

export const routes = [
  {
    path: 'treatments', component: TreatmentsContainerComponent,
    children: [
      {path: '', component: TreatmentsComponent},
      {path: 'details/:id', component: TreatmentDetailComponent}
    ]
  },
];
