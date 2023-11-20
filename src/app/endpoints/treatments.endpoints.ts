import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class TreatmentService {
  private url = "http://localhost:3000/treatments";
  constructor(private http: HttpClient) {
  }

  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.url}`)
  }
}
