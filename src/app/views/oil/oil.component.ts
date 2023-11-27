import {Component, ElementRef, ViewChild} from '@angular/core';
import {OilService} from "../../endpoints/oil.endpoints";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import * as Constants from "../../config/oil-constants";
import {
    validateBottleSize,
    validateDescription, validateIngredientList,
    validateName, validateNewIngredient,
    validatePrice
} from "../../validators/oil-validator";
import {RouterLink} from "@angular/router";
import {CreateOilComponent} from "./create-oil/create-oil.component";

@Component({
    selector: 'app-oil',
    templateUrl: './oil.component.html',
    styleUrls: ['./oil.component.css'],
    imports: [
        NgForOf,
        NgIf,
        NgClass,
        ReactiveFormsModule,
        FormsModule,
        RouterLink,
        CreateOilComponent
    ],
    standalone: true
})
export class OilComponent {
    oils: Oil[] = [];
    activeOil = {} as Oil;
    isEditingModeActive: boolean = false;
    oilService: OilService;
    filteredOils: Oil[] = [];
    searchTerm: string = '';

    editForm: FormGroup;

    constructor(oilService: OilService, private formBuilder: FormBuilder) {
        this.oilService = oilService;
        this.editForm = this.formBuilder.group({
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
        this.getOils();
        this.oilService.ingredientList = [];
    }

    getOils() {
        this.oilService.getOils().subscribe(data => {
            console.log(Constants.CRUD_MESSAGE['readDataSuccess'], data);
            this.oils = data
            this.filteredOils = [...this.oils];
        });
    }

    updateOil(oil: Oil): void {
        this.editForm.get('ingredientList')?.setValue(this.oilService.ingredientList);

        if (this.editForm.valid) {
            this.oilService.updateOil(oil, this.editForm.value).subscribe({
                next: () => {
                    this.getOils();
                    this.setEditingModeActive(false);
                    this.activeOil = {} as Oil;

                    console.log(Constants.CRUD_MESSAGE['updateDataSuccess']);
                },
                error: error => {
                    console.log(Constants.CRUD_MESSAGE['updateDataError'], error)
                }
            });
        }
        console.log(Constants.CRUD_MESSAGE['updateDataError'])
    }

    deleteOil(oil: Oil): void {
        if(confirm(Constants.CRUD_MESSAGE['deleteConfirm'].replace("[...]", oil.name))){
            this.oilService.deleteOil(oil).subscribe({
                next: () => {
                    this.getOils();
                    this.setEditingModeActive(false);
                    this.activeOil = {} as Oil;

                    console.log(Constants.CRUD_MESSAGE['deleteDataSuccess']);
                },
                error: error => {
                    console.log(Constants.CRUD_MESSAGE['deleteDataError'], error)
                }
            });
            console.log(Constants.CRUD_MESSAGE['deleteDataError']);
        }
    }

    setActiveOil(oil: Oil): void {
        this.activeOil = oil;
        this.oilService.ingredientList = this.activeOil.ingredients;
    }

    setEditingModeActive(isEditingModeActive: boolean): void {
        this.isEditingModeActive = isEditingModeActive;
    }

    addIngredient(): void {
        this.oilService.addIngredient();
    }

    deleteIngredient(): void {
        this.oilService.deleteIngredient();
    }

    filterOils(): void {
        this.filteredOils = this.oils.filter(oil =>
            oil.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            oil.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }
}
