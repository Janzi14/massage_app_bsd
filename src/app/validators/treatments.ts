import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class TreatmentValidators {
  static priceRangeValidator(): ValidatorFn {
    return (price: AbstractControl): ValidationErrors | null => {
      if (isNaN(price.value) || price.value < 30 || price.value > 100) {
        return {range: {message: "Der Preis muss zwischen 30 und 100 liegen."}};
      }
      return null;
    }
  }

  static wordLengthValidator(minLength: number, maxLength: number, name: string): ValidatorFn {
    return (word: AbstractControl): ValidationErrors | null => {
      if (!(typeof word.value === "string") || word.value.length < minLength || word.value.length > maxLength) {
        return {range: {message: `Die Wortlänge von ${name} muss zwischen ${minLength} und ${maxLength} liegen.`}};
      }
      return null;
    }
  }


}
