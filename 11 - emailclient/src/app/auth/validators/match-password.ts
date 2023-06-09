import { Injectable } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';

// 'implements Validator' ensures that we implement the custom validator class correctly
@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {
    validate(control: AbstractControl) {
        const { password, passwordConfirmation } = control.value;

        if (password === passwordConfirmation) {
            return null;
        } else {
            return { passwordsDontMatch: true };
        }
    }
}
