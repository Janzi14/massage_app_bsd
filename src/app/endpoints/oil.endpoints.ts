import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root',
})
export class OilService {
  private dataUrl = 'http://localhost:3000/oil';

  constructor(private http: HttpClient) {}

  //CREATE
  //TODO

  //READ
  getOils(): Observable<Oil[]> {
    return this.http.get<Oil[]>(this.dataUrl);
  }

  //UPDATE
  updateOil(oil: Oil, values: any): Observable<Oil> {
    const ingredientListBackup = values.ingredientList;
    delete values.ingredientList;
    delete values.newIngredient;

    const updatedOil: Oil = {
      ...oil,
      ...values,
      price: parseFloat(values.price),
      bottle_size: parseInt(values.bottle_size),
      ingredients: ingredientListBackup
    };

    return this.http.patch<Oil>(this.dataUrl+"/"+oil.id, updatedOil);
  }

  //DELETE
  //TODO
}
