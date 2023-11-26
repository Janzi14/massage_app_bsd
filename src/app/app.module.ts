import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { TreatmentsComponent } from './views/treatments/treatments.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule { }
