import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '@shared/services/login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReturnGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.valid();
  }
  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.valid();
  }

  valid(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    if (this.loginService.isLoggedInReturn()) {
      // console.log('de /home/return-request-menu al /home/return-request-menu');
      return true;
    } else {
      // console.log('de /home/return-request-menu al /home/access');
      return this.router.navigate(['/home/access']);
    } 
  }
}
