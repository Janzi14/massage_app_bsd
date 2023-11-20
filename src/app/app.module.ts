import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TreatmentsComponent } from './views/treatments/treatments.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TeamComponent } from './views/team/team.component';
import {provideHttpClient} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [provideRouter(routes), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule { }
