import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '@shared/services/login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginReturnGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isLoggedInReturn()) {
        // console.log('de /home/access al /home/return-request-menu');
        return this.router.navigate(['/home/return-request-menu']);
      } else {
        // console.log('de /home/access al /home/access');
        return true;
      }
  }
  
}
