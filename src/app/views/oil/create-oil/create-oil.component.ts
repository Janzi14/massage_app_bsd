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
    validateNewIngredient, validateOrigin,
    validatePrice
} from "../../../validators/oil-validator";
import {Router, RouterLink} from "@angular/router";
import {Country} from "../../../types/country";
import {CountryService} from "../../../endpoints/country.endpoints";

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

    templatePictures: string[] = Constants.TEMPLATE_PICTURES;
    chosenPictures: string[] = [];
    pictureIsChosen: boolean[] = [];

    addForm: FormGroup = {} as FormGroup;


    countries: Country[] = [];
    countryService: CountryService;

    constructor(oilService: OilService, countryService: CountryService, private formBuilder: FormBuilder, private router: Router) {
        this.oilService = oilService;
        this.countryService = countryService;
    }

    ngOnInit(): void {
        this.countries = []
        this.setAddingModeActive(true);
        this.getCountries();
        this.oilService.ingredientList = [];
        this.createAddForm();
    }

    createAddForm(){
      this.addForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required, validateName]),
        description: new FormControl('', [Validators.required, validateDescription]),
        price: new FormControl(0, [Validators.required, validatePrice]),
        bottle_size: new FormControl(0, [Validators.required, validateBottleSize]),
        origin: new FormControl('Österreich', [Validators.required, validateOrigin]),
        availability: false,
        newIngredient: new FormControl('', [validateNewIngredient]),
        ingredientList: new FormControl(this.oilService.ingredientList, [validateIngredientList])
      });
    }

    createOil(): void {
        if (this.addForm != undefined) {
            this.addForm.get('ingredientList')?.setValue(this.oilService.ingredientList);

            if (this.addForm.valid) {
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
        }
        console.log(Constants.CRUD_MESSAGE['createDataError']);
    }

    setAddingModeActive(isAddingModeActive: boolean): void {
        this.isAddingModeActive = isAddingModeActive;
    }

    getCountries(){
        this.countryService.getCountries().subscribe(data => {
            this.countries = data;
        });
    }

    addIngredient(): void {
        this.oilService.addIngredient();
        if(this.addForm.get('newIngredient')?.valid){
            this.addForm.get('newIngredient')?.setValue("");
        }
    }

    deleteIngredient(): void {
        this.oilService.deleteIngredient();
    }

    private createOilObject(): Oil {
        this.addForm.get('ingredientList')?.setValue(this.oilService.ingredientList);
        let pictureBackup: string[];

        console.log(this.chosenPictures.length<1);


        if (this.chosenPictures.length < 1) {
            pictureBackup = Constants.NO_PICTURE;
        } else {
            pictureBackup = this.chosenPictures;
        }
        console.log(pictureBackup);

        const ingredientListBackup = this.addForm.value.ingredientList;

        delete this.addForm.value.newIngredient;
        delete this.addForm.value.ingredientList;

        console.log(this.addForm.valid);

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
                pictures: pictureBackup
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

    togglePictureAdd(templatePicture: string, index: number) {
        if (this.chosenPictures.includes(templatePicture)) {
            this.pictureIsChosen[index] = false;
            this.chosenPictures.forEach((element, i) => {
                if (element == templatePicture) {
                    this.chosenPictures.splice(i, 1);
                }
            });
        } else {
            this.pictureIsChosen[index] = true;
            this.chosenPictures.push(templatePicture);
        }
    }
}
