import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Modify or log the outgoing request
        // req is readonly, so we will make a clone of it to change porperties
        const modifiedReq = req.clone({
            withCredentials: true
        });

        return next.handle(modifiedReq)
            // // investigate the observable status..
            // .pipe(
            //     tap(val => {
            //         if (val.type === HttpEventType.Sent) {
            //             console.log('Request was sent to server');
            //         }

            //         if (val.type === HttpEventType.Response) {
            //             console.log('Got a response from the API', val);
            //         }
            //     })
            // );
    }
}
