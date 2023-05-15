import { AbstractControl } from '@angular/forms';

export class MathValidators {
    
    // A static class method is a method that belongs to the class itself, not the instance of a class
    // in this method, we cannot access any properties of the class
    static addition(target: string, sourceOne: string, sourceTwo: string) {
        return (form: AbstractControl) => {
            const sum = form.value[target];
            const firstNumber = form.value[sourceOne];
            const secondNumber = form.value[sourceTwo];
            if (firstNumber + secondNumber === parseInt(sum)) {
              // returns no error
              return null;
            }
      
            // returns an error
            return { addition: true };
        };

    }
}
