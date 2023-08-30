import {AbstractControl, ValidatorFn} from '@angular/forms';

export class Validation {
  private static readonly PASSWORD_PATTERN = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  static champsIdentiquesValidator(valeurChamps: string, confirmeValeurChamps: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(valeurChamps);
      const checkControl = controls.get(confirmeValeurChamps);

      if (checkControl?.errors && !checkControl.errors['nonIdentiques']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(confirmeValeurChamps)?.setErrors({nonIdentiques: true});
        return {nonIdentiques: true};
      } else {
        return null;
      }
    };
  }

  static patternMotDePasseValidator(motDePasse: string): ValidatorFn {
    return (formControl: AbstractControl) => {
      const control = formControl.get(motDePasse);

      if (!control) {
        return null;
      }

      const regex = new RegExp(Validation.PASSWORD_PATTERN);
      const validationPattern = regex.test(control.value)
      if (!validationPattern) {
        control?.setErrors({motDePasseInvalide: true});
        return {motDePasseInvalide: true};
      } else {
        return null;
      }
    };
  }
}
