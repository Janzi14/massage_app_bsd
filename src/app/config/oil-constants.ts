export const NAME_MAX_LENGTH: number = 25;
export const NAME_MIN_LENGTH: number = 3;
export const DESCRIPTION_MAX_LENGTH: number = 150;
export const DESCRIPTION_MIN_LENGTH: number = 10;
export const BOTTLESIZE_MIN_SIZE: number = 50;
export const INGREDIENT_MAX_LENGTH: number = 15;
export const INGREDIENT_MIN_LENGTH: number = 5;

export const ERROR_MESSAGES: { [key: string]: string } = {
  //Validator
  'nameNullError': 'Name darf nicht leer sein.',
  'nameLengthError': 'Name muss zwischen ' + NAME_MIN_LENGTH + ' und ' + NAME_MAX_LENGTH + ' Zeichen lang sein.',
  'descriptionNullError': 'Beschreibung darf nicht leer sein.',
  'descriptionLengthError': 'Beschreibung muss zwischen ' + DESCRIPTION_MIN_LENGTH + ' und ' + DESCRIPTION_MAX_LENGTH + ' Zeichen lang sein.',
  'priceNotPositiveError': 'Preis muss einen positiven Wert (>0) haben.',
  'bottleSizeNotPositiveError': 'Flaschenvolumen muss einen positiven Wert (>0) haben.',
  'bottleSizeVolumeError': 'Flaschenvolumen muss mindestens ' + BOTTLESIZE_MIN_SIZE + ' ml betragen.',
  'ingredientLengthError': 'Inhaltsstoff muss zwischen ' + INGREDIENT_MIN_LENGTH + ' und ' + INGREDIENT_MAX_LENGTH + ' Zeichen lang sein.',
  'ingredientListNullError': 'Inhaltsstoff-Liste darf nicht leer sein.'
};

export const CRUD_MESSAGE: {[key: string]: string} = {
  //Create
  'createDataSuccess': 'Öl erfolgreich erstellt.',
  'createDataError': 'Fehler beim Erstellen des Öls.',

  //Read
  'readDataSuccess': 'Lesen der Öle erfolgreich: ',

  //Update
  'updateDataSuccess': 'Öl erfolgreich geupdatet.',
  'updateDataError': 'Fehler beim Aktualisieren des Öls.',

  //Delete
  'deleteDataSuccess': 'Öl erfolgreich gelöscht.',
  'deleteDataError': 'Fehler beim Löschen des Öls.',
  'deleteConfirm': 'Möchten Sie \'[...]\' wirklich löschen?'
};
