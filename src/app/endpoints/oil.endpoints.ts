import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OilService {
  private dataUrl = 'http://localhost:3000/oil';

  constructor(private http: HttpClient) {
  }

  //CREATE
  //TODO

  //READ
  getOils(): Observable<Oil[]> {
    return this.http.get<Oil[]>(this.dataUrl);
  }

  //UPDATE
  updateOil(oil: Oil) {
    console.log("Updating oil...");
    //TODO
  }

  //DELETE
  //TODO
}
