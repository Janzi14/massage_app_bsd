import {Component} from '@angular/core';
import {OilService} from "../../endpoints/oil.endpoints";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import * as Constants from "../../config/oil-constants";
import {
  getErrorMsg, isNewIngredientAllowed,
  validateBottleSize,
  validateDescription, validateIngredientList,
  validateName, validateNewIngredient,
  validatePrice
} from "../../validators/oil-validator";

@Component({
  selector: 'app-oil',
  templateUrl: './oil.component.html',
  styleUrls: ['./oil.component.css'],
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    FormsModule
  ],
  standalone: true
})
export class OilComponent {
  oils: Oil[] = [];
  activeOil = {} as Oil;
  isEditingModeActive: boolean = false;
  ingredientList: string[] = [];
  newIngredient: string = "";

  editForm = this.formBuilder.group({
    name: new FormControl('', [Validators.required, validateName]),
    description: new FormControl('', [Validators.required, validateDescription]),
    price: new FormControl(0, [Validators.required, validatePrice]),
    bottle_size: new FormControl(0, [Validators.required, validateBottleSize]),
    origin: new FormControl('', [Validators.required /*TODO: Autocomplete API*/]),
    availability: false,
    newIngredient: new FormControl('', [validateNewIngredient]),
    ingredientList: new FormControl(this.ingredientList, [validateIngredientList])
  });

  constructor(private oilService: OilService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getOils();
  }

  getOils() {
    this.oilService.getOils().subscribe(data => {
      console.log(Constants.CRUD_MESSAGE['readDataSuccess'], data);
      this.oils = data
    });
  }

  updateOil(oil: Oil): void {
    this.editForm.get('ingredientList')?.setValue(this.ingredientList);

    if (this.editForm.valid) {
      this.oilService.updateOil(oil, this.editForm.value).subscribe({
        next: () => {
          this.getOils();
          this.setEditingModeActive(false);
          this.activeOil = {} as Oil;

          console.log(Constants.CRUD_MESSAGE['updateDataSuccess'], );
        },
        error: error => {
          console.log(Constants.CRUD_MESSAGE['updateDataError'], error)
        }
      });
    }
  }

  setActiveOil(oil: Oil): void {
    this.activeOil = oil;
    this.ingredientList = this.activeOil.ingredients;
  }

  setEditingModeActive(isEditingModeActive: boolean): void {
    this.isEditingModeActive = isEditingModeActive;
  }

  addIngredient(): void {
    if(isNewIngredientAllowed(this.newIngredient)){
      this.ingredientList.push(this.newIngredient);
      this.newIngredient = '';
      return;
    }
  }

  deleteIngredient(): void {
    if (this.ingredientList != null) {
      this.ingredientList.pop();
    }
  }

  protected readonly getErrorMsg = getErrorMsg;
}
