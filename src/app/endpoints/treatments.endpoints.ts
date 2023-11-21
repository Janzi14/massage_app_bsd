import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Treatment} from "../types/treatments";

@Injectable({providedIn: 'root'})
export class TreatmentService {
  private url = "http://localhost:3000/treatments";

  constructor(private http: HttpClient) {
  }

  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.url}`)
  }

  deleteTreatment(id: string) {
    return this.http.delete(`${this.url}/${id}`)
  }
  updateTreatment(treatment: Treatment) {
    return this.http.patch(`${this.url}/${treatment.id}`, treatment)
  }
  addTreatment(treatment: Treatment) {
    return this.http.post(`${this.url}`, treatment)
  }

}
