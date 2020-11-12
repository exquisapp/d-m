import { Injectable } from '@angular/core';
import { ActivatedRoute,
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate, CanLoad {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkEmail(sessionStorage.getItem('dunder-mifflin-email'));
  }

  canLoad(route: Route): boolean {
    return this.checkEmail(sessionStorage.getItem('dunder-mifflin-email'));
  }

  checkEmail(email: string): boolean {
    if () { // check if email is among valid emails fetched
      return true;
    } else {
        // this.router.navigateByUrl('/user/login');
        this.router.navigate(['/login']);
        return false;
    }
  }
}


@Injectable()
export class CanExitGuard implements CanDeactivate<CanExit> {
 canDeactivate(component: CanExit) {
   if (component.canDeactivate) {
     return component.canDeactivate();
   }
   return true;
 }
}

export interface CanExit {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
