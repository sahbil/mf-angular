import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function arrayValidator(arr: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => (arr && arr.length > 0 ? null : { arrayEmpty: false });
}
