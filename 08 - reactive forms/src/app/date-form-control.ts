import { FormControl } from "@angular/forms";

export class DateFormControl extends FormControl {
    override setValue(value: string | null, options: any) {
        if (!value) {
            super.setValue('', { ...options, emitModelToViewChange: true});
            return; 
        }

        // allow user only to input numbers and '/'
        if (value.match(/[^0-9|\/]/gi)) {
            // call the initial (original) set value from the 'FormControl' class
            super.setValue(this.value, { ...options, emitModelToViewChange: true});
                // 'this.value' is stored on the 'FormControl' class, this reverts the value
                // 'emitModelToViewChange' will send the new set value to the template view
            return; 
        }

        // dismiss any inputs made by the user when there are already 5 characters inserted
        if(value.length > 5) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true});
            return;
        }

        // allows deletion of the '/' if the user wants to
        if (value.length === 2 && this.value.length ===3) {
            super.setValue(value, { ...options, emitModelToViewChange: true});
            return;
        }

        // adds a '/' after the first 2 digits
        if (value.length === 2) {
            super.setValue(value + '/', { ...options, emitModelToViewChange: true});   
            return;
        }
        
        super.setValue(value, { ...options, emitModelToViewChange: true});
    }
}
