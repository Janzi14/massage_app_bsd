import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TreatmentsComponent } from './views/treatments/treatments.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { OilComponent } from './views/oil/oil.component';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
