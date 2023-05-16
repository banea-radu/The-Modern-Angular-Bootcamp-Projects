import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, skipWhile, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

constructor(
  private authService: AuthService,
  private router: Router
  ) {}

  canLoad(route: Route, segments: UrlSegment[])
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.signedin$.pipe(
        skipWhile(value => value === null),
        map((value) => value!),
        // 'take' operator will trick the subscriber into thinking that the observable is complete
        take(1),
        tap((authenicated) => {
          if (!authenicated) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }
}
