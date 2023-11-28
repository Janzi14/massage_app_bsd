import {AbstractControl} from '@angular/forms';
import * as Constants from "../config/oil-constants";
import {Country} from "../types/country";

export function getErrorMsg(errorCode: string): string {
  return Constants.ERROR_MESSAGES[errorCode] || 'Unbekannter Fehler';
}

export function validateName(control: AbstractControl) {
  const name: string = control.value;

  if (name == null || name.trim().length < 1) {
    return {'nameNullError': Constants.ERROR_MESSAGES['nameNullError']};
  } else if (name.trim().length < Constants.NAME_MIN_LENGTH || name.trim().length > Constants.NAME_MAX_LENGTH) {
    return {'nameLengthError': Constants.ERROR_MESSAGES['nameLengthError']};
  }

  return null;
}

export function validateDescription(control: AbstractControl) {
  const description: string = control.value;

  if (description == null || description.trim().length < 1) {
    return {'descriptionNullError': Constants.ERROR_MESSAGES['descriptionNullError']};
  } else if (description.trim().length < Constants.DESCRIPTION_MIN_LENGTH || description.trim().length > Constants.DESCRIPTION_MAX_LENGTH) {
    return {'descriptionLengthError': Constants.ERROR_MESSAGES['descriptionLengthError']};
  }

  return null;
}

export function validatePrice(control: AbstractControl) {
  const price: number = control.value;

  if (price == null || price <= 0) {
    return {'priceNotPositiveError': Constants.ERROR_MESSAGES['priceNotPositiveError']};
  }

  return null;
}

export function validateBottleSize(control: AbstractControl) {
  const bottleSize: number = control.value;

  if (bottleSize == null || bottleSize <= 0) {
    return {'bottleSizeNotPositiveError': Constants.ERROR_MESSAGES['bottleSizeNotPositiveError']};
  } else if (bottleSize < Constants.BOTTLESIZE_MIN_SIZE) {
    return {'bottleSizeVolumeError': Constants.ERROR_MESSAGES['bottleSizeVolumeError']};
  }

  return null;
}

export function validateNewIngredient(control: AbstractControl) {
  const ingredient: string = control.value;

  if (ingredient == null || ingredient.length < 1) {
    return null;
  } else if (ingredient.trim().length < Constants.INGREDIENT_MIN_LENGTH || ingredient.trim().length > Constants.INGREDIENT_MAX_LENGTH) {
    return {'ingredientLengthError': Constants.ERROR_MESSAGES['ingredientLengthError']};
  }

  return null;
}

export function validateIngredientList(control: AbstractControl) {
  const ingredients: string[] = control.value;

  if (ingredients == null || ingredients.length < 1) {
    return {'ingredientListNullError': Constants.ERROR_MESSAGES['ingredientListNullError']};
  }

  return null;
}

export function validateOrigin(control: AbstractControl) {
  const origin: Country = control.value;

  if (origin == null) {
    return {'originNullError': Constants.ERROR_MESSAGES['originNullError']};
  }

  return null;
}

export function isNewIngredientAllowed(newIngredient: string): boolean {
  if (newIngredient == null || newIngredient.length < 1) {
    return false;
  } else if (newIngredient.trim().length < Constants.INGREDIENT_MIN_LENGTH || newIngredient.trim().length > Constants.INGREDIENT_MAX_LENGTH) {
    return false;
  }
  return true;
}
