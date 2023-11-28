import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AbstractControl} from "@angular/forms";
import {isNewIngredientAllowed} from "../validators/oil-validator";
import {TEMPLATE_PICTURES} from "../config/oil-constants";

@Injectable({
  providedIn: 'root',
})
export class OilService {
  private dataUrl = 'http://localhost:3000/oil';

  ingredientList: string[] = [];
  newIngredient: string = "";

  constructor(private http: HttpClient) {}

  //CREATE
  createOil(oil: Oil){
    return this.http.post(this.dataUrl, oil);
  }

  //READ
  getOils(): Observable<Oil[]> {
    return this.http.get<Oil[]>(this.dataUrl);
  }

  getTemplatePictures(): string[]{
    return TEMPLATE_PICTURES;
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
  deleteOil(oil: Oil): Observable<any>{
    return this.http.delete(this.dataUrl+"/"+oil.id);
  }


  //Helper
  addIngredient(): void {
    if (isNewIngredientAllowed(this.newIngredient)) {
      this.ingredientList.push(this.newIngredient);
      this.newIngredient = '';
    }
  }

  deleteIngredient(): void {
    if (this.ingredientList != null) {
      this.ingredientList.pop();
    }
  }
}
