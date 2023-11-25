import {AbstractControl} from '@angular/forms';

const NAME_MAX_LENGTH: number = 25;
const NAME_MIN_LENGTH: number = 3;
const DESCRIPTION_MAX_LENGTH: number = 150;
const DESCRIPTION_MIN_LENGTH: number = 10;
const BOTTLESIZE_MIN_SIZE: number = 50;
const INGREDIENT_MAX_LENGTH: number = 15;
const INGREDIENT_MIN_LENGTH: number = 5;
const INGREDIENTLIST_MIN_LENGTH: number = 1;


const ERROR_MESSAGES: { [key: string]: string } = {
  'nameNullError': 'Name darf nicht leer sein.',
  'nameLengthError': 'Name muss zwischen ' + NAME_MIN_LENGTH + ' und ' + NAME_MAX_LENGTH + ' Zeichen lang sein.',
  'descriptionNullError': 'Beschreibung darf nicht leer sein.',
  'descriptionLengthError': 'Beschreibung muss zwischen ' + DESCRIPTION_MIN_LENGTH + ' und ' + DESCRIPTION_MAX_LENGTH + ' Zeichen lang sein.',
  'priceNotPositiveError': 'Preis muss einen positiven Wert (>0) haben.',
  'bottleSizeNotPositiveError': 'Flaschenvolumen muss einen positiven Wert (>0) haben.',
  'bottleSizeVolumeError': 'Flaschenvolumen muss mindestens ' + BOTTLESIZE_MIN_SIZE + ' ml betragen.',
  'ingredientLengthError': 'Inhaltsstoff muss zwischen ' + INGREDIENT_MIN_LENGTH + ' und ' + INGREDIENT_MAX_LENGTH + ' Zeichen lang sein.',
  'ingredientListNullError': 'Inhaltsstoff-Liste darf nicht leer sein.',
  'ingredientListLengthError': 'Inhaltsstoff-Liste muss mindestens ' + INGREDIENT_MIN_LENGTH + ' Inhaltsstoffe enthalten.',
};

export function getErrorMsg(errorCode: string): string {
  return ERROR_MESSAGES[errorCode] || 'Unbekannter Fehler';
}

export function validateName(control: AbstractControl) {
  const name: string = control.value;

  if (name == null || name.trim().length < 1) {
    return {'nameNullError': ERROR_MESSAGES['nameNullError']};
  } else if (name.trim().length < NAME_MIN_LENGTH || name.trim().length > NAME_MAX_LENGTH) {
    return {'nameLengthError': ERROR_MESSAGES['nameLengthError']};
  }

  return null;
}

export function validateDescription(control: AbstractControl) {
  const description: string = control.value;

  if (description == null || description.trim().length < 1) {
    return {'descriptionNullError': ERROR_MESSAGES['descriptionNullError']};
  } else if (description.trim().length < DESCRIPTION_MIN_LENGTH || description.trim().length > DESCRIPTION_MAX_LENGTH) {
    return {'descriptionLengthError': ERROR_MESSAGES['descriptionLengthError']};
  }

  return null;
}

export function validatePrice(control: AbstractControl) {
  const price: number = control.value;

  if (price == null || price <= 0) {
    return {'priceNotPositiveError': ERROR_MESSAGES['priceNotPositiveError']};
  }

  return null;
}

export function validateBottleSize(control: AbstractControl) {
  const bottleSize: number = control.value;

  if (bottleSize == null || bottleSize <= 0) {
    return {'bottleSizeNotPositiveError': ERROR_MESSAGES['bottleSizeNotPositiveError']};
  } else if (bottleSize < BOTTLESIZE_MIN_SIZE) {
    return {'bottleSizeVolumeError': ERROR_MESSAGES['bottleSizeVolumeError']};
  }

  return null;
}

export function validateNewIngredient(control: AbstractControl) {
  const ingredient: string = control.value;

  if (ingredient == null || ingredient.length < 1) {
    return null;
  } else if (ingredient.trim().length < INGREDIENT_MIN_LENGTH || ingredient.trim().length > INGREDIENT_MAX_LENGTH) {
    return {'ingredientLengthError': ERROR_MESSAGES['ingredientLengthError']};
  }

  return null;
}

export function validateIngredientList(control: AbstractControl) {
  const ingredients: string[] = control.value;

  if (ingredients == null || ingredients.length < 1) {
    return {'ingredientListNullError': ERROR_MESSAGES['ingredientListNullError']};
  } else if (ingredients.length < INGREDIENTLIST_MIN_LENGTH) {
    return {'ingredientListLengthError': ERROR_MESSAGES['ingredientListLengthError']};
  }

  return null;
}

export function isNewIngredientAllowed(newIngredient: string): boolean{
  if (newIngredient == null || newIngredient.length < 1) {
    return false;
  } else if (newIngredient.trim().length < INGREDIENT_MIN_LENGTH || newIngredient.trim().length > INGREDIENT_MAX_LENGTH) {
    return false;
  }
  return true;
}
