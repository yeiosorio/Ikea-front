import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '@shared/services/login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}
  
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLoggedInReport()) {
      console.log('de /reports/report-home al /reports/report-home');
      return true;
    } else {
      console.log('de /reports/report-home al /reports/access');
      return this.router.navigate(['/reports/access']);
    }
  }
  
}
