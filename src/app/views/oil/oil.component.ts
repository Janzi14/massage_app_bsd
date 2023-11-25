import {Component} from '@angular/core';
import {OilService} from "../../endpoints/oil.endpoints";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
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
    inputName: new FormControl('', [Validators.required, validateName]),
    inputDescription: new FormControl('', [Validators.required, validateDescription]),
    inputPrice: new FormControl('', [Validators.required, validatePrice]),
    inputBottleSize: new FormControl('', [Validators.required, validateBottleSize]),
    inputOrigin: ['', Validators.required /*TODO: Autocomplete API*/],
    inputAvailability: false,
    inputIngredients: new FormControl('', [validateNewIngredient]),
    ingredientList: new FormControl('', [Validators.required, validateIngredientList])
  });

  constructor(private oilService: OilService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.oilService.getOils().subscribe(data => {
      console.log(data);
      this.oils = data
    });
  }

  updateOil(oil: Oil): void {
    // if (oil != null) {
    //   this.oilService.updateOil(oil);
    // }

    console.log("submit...", this.editForm.value, this.editForm.invalid);
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
    if(this.ingredientList != null){
      this.ingredientList.pop();
    }
  }

  protected readonly getErrorMsg = getErrorMsg;
}
