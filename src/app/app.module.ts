import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [provideRouter(routes),  provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule { }
