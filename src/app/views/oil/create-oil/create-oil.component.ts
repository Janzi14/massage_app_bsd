import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {OilService} from "../../../endpoints/oil.endpoints";
import {v4 as uuidv4} from "uuid";
import * as Constants from "../../../config/oil-constants";
import {
    validateBottleSize,
    validateDescription, validateIngredientList,
    validateName,
    validateNewIngredient,
    validatePrice
} from "../../../validators/oil-validator";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-create-oil',
    templateUrl: './create-oil.component.html',
    styleUrls: ['./create-oil.component.css'],
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        RouterLink
    ],
    standalone: true
})
export class CreateOilComponent {
    isAddingModeActive: boolean = false;
    oilService: OilService;

    addForm: FormGroup;

    constructor(oilService: OilService, private formBuilder: FormBuilder, private router: Router) {
        this.oilService = oilService;
        this.addForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required, validateName]),
            description: new FormControl('', [Validators.required, validateDescription]),
            price: new FormControl(0, [Validators.required, validatePrice]),
            bottle_size: new FormControl(0, [Validators.required, validateBottleSize]),
            origin: new FormControl('', [Validators.required /*TODO: Autocomplete API*/]),
            availability: false,
            newIngredient: new FormControl('', [validateNewIngredient]),
            ingredientList: new FormControl(this.oilService.ingredientList, [validateIngredientList])
        });
    }

    ngOnInit(): void {
        this.setAddingModeActive(true);
        this.oilService.ingredientList = [];
    }

    createOil(): void {
        console.log(this.addForm.value.ingredientList);

        if (this.addForm != undefined && this.addForm.valid) {
            const newOil = this.createOilObject();

            if (newOil != undefined || newOil != null) {
                this.oilService.createOil(newOil).subscribe({
                    next: () => {
                        this.setAddingModeActive(false);
                        this.router.navigate(['oil']);

                        console.log(Constants.CRUD_MESSAGE['createDataSuccess']);
                    },
                    error: error => {
                        console.log(Constants.CRUD_MESSAGE['createDataError'], error);
                    }
                });
                return;
            }
        }
        console.log(Constants.CRUD_MESSAGE['createDataError']);
    }

    setAddingModeActive(isAddingModeActive: boolean): void {
        this.isAddingModeActive = isAddingModeActive;
    }

    addIngredient(): void {
        this.oilService.addIngredient();
    }

    deleteIngredient(): void {
        this.oilService.deleteIngredient();
    }

    private createOilObject(): Oil {
        console.log(this.oilService.ingredientList);

        this.addForm.get('ingredientList')?.setValue(this.oilService.ingredientList);

        const ingredientListBackup = this.addForm.value.ingredientList;

        delete this.addForm.value.newIngredient;
        delete this.addForm.value.ingredientList;

        if (this.addForm.valid) {
            const newId: string = uuidv4();

            return {
                id: newId,
                name: this.addForm.value.name,
                description: this.addForm.value.description,
                ingredients: ingredientListBackup,
                bottle_size: parseInt(this.addForm.value.bottle_size),
                price: parseFloat(this.addForm.value.price),
                availability: this.addForm.value.availability,
                origin: this.addForm.value.origin,
                pictures: ["picture1.jpg", "picture2.jpg" /*TODO File Input/Upload*/]
            }
        } else {
            this.addForm.markAllAsTouched(); //trigger validator
            return {} as Oil;
        }
    }

    cancelAndNavigateBack(): void{
        this.setAddingModeActive(false);
        this.router.navigate(['oil']);
    }
}
