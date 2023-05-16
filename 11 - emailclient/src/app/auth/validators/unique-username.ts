import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';


@Injectable({ providedIn: 'root'})
export class UniqueUsername  implements AsyncValidator {
    constructor(private authService: AuthService) {}

    validate = (control: AbstractControl): any => {
        const { value } = control;

        return this.authService.usernameAvailable(value).pipe(
            // if there is a response from the server, then the user is available, so there are no errors, we return null (no errors)
            map(() => {
                return null
            }),
            // if the server response is an error, we create a new observable that emits an object
            catchError(err => {
                if (err.error.username) {
                    return of({ nonUniqueUsername: true });
                } else {
                    return of({ noConnection: true });
                }             
            })
        );
    };
}
