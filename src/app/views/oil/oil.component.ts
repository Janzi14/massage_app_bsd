import {Component, ElementRef, ViewChild} from '@angular/core';
import {OilService} from "../../endpoints/oil.endpoints";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import * as Constants from "../../config/oil-constants";
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
    validateBottleSize,
    validateDescription, validateIngredientList,
    validateName, validateNewIngredient,
    validatePrice
} from "../../validators/oil-validator";
import {RouterLink} from "@angular/router";
import {CreateOilComponent} from "./create-oil/create-oil.component";
import html2PDF from "jspdf-html2canvas";

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
    activeOil = {} as Oil | null;
    isEditingModeActive: boolean = false;
    oilService: OilService;
    filteredOils: Oil[] = [];
    searchTerm: string = '';

    editForm: FormGroup = {} as FormGroup;

    constructor(oilService: OilService, private formBuilder: FormBuilder) {
        this.oilService = oilService;
    }

    ngOnInit(): void {
        this.getOils();
        this.oilService.ingredientList = [];
        this.createEditForm();
    }

    createEditForm() {
        this.editForm = this.formBuilder.group({
            name: new FormControl(this.activeOil?.name, [Validators.required, validateName]),
            description: new FormControl(this.activeOil?.description, [Validators.required, validateDescription]),
            price: new FormControl(this.activeOil?.price, [Validators.required, validatePrice]),
            bottle_size: new FormControl(this.activeOil?.bottle_size, [Validators.required, validateBottleSize]),
            origin: new FormControl(this.activeOil?.origin, [Validators.required /*TODO: Autocomplete API*/]),
            availability: this.activeOil?.availability,
            newIngredient: new FormControl('', [validateNewIngredient]),
            ingredientList: new FormControl(this.oilService.ingredientList, [validateIngredientList])
        });
    }

    getOils() {
        this.oilService.getOils().subscribe(data => {
            console.log(Constants.CRUD_MESSAGE['readDataSuccess'], data);
            this.oils = data
            this.filteredOils = [...this.oils];
        });
    }

    updateOil(oil: Oil | null): void {
        if (oil != null) {
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
    }

    deleteOil(oil: Oil | null): void {
        if (oil != null) {
            if (confirm(Constants.CRUD_MESSAGE['deleteConfirm'].replace("[...]", oil.name))) {
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
    }

    setActiveOil(oil: Oil): void {
        this.activeOil = oil;
        this.oilService.ingredientList = this.activeOil.ingredients;
        this.createEditForm();
    }

    setEditingModeActive(isEditingModeActive: boolean): void {
        this.isEditingModeActive = isEditingModeActive;
    }

    addIngredient(): void {
        this.oilService.addIngredient();
        if(this.editForm.get('newIngredient')?.valid){
            this.editForm.get('newIngredient')?.setValue("");
        }
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

    async printOils(isDetailView: boolean) {
        let elementToPrint: HTMLElement | null;
        let fileName: string;
        if (isDetailView) {
            elementToPrint = document.getElementById('printDetail');
            fileName = 'oel_detail_uebersicht_' +
                this.activeOil?.name.toLowerCase()
                    .replaceAll("[:\\\\/*?|<>]", "")
                + '.pdf';
        } else {
            elementToPrint = document.getElementById('printOverview');
            fileName = 'oel_detail_uebersicht_gesamt.pdf';
        }

        if (elementToPrint) {
            await html2PDF(elementToPrint, {
                jsPDF: {
                    format: 'a4',
                },
                imageType: 'image/png',
                output: fileName,
                success: function (pdf) {
                    pdf.save(fileName);
                }
            });

            console.log('PDF wurde erstellt.');
        } else {
            console.log('Element mit angegebener ID nicht gefunden.');
        }

    }
}
