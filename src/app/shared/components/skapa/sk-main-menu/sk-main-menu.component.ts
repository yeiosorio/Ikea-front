import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@shared/services/login/login.service';

@Component({
  selector: 'app-sk-main-menu',
  templateUrl: './sk-main-menu.component.html',
  styleUrls: ['./sk-main-menu.component.scss']
})
export class SkMainMenuComponent implements OnInit {

  currentUrl = '';

  constructor(
    private router : Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    console.log('router.events1: ', this.router.url);
    // this.router.events
    //   .subscribe({
    //     next: (res)=> {
    //       console.log('router.events2: ', res);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //     complete: () => {console.log('complete');}
    //   });
  }

  logout() {
    this.loginService.logout();
  }

  // [ngClass]="{active: isActive('home')}"
  isActive(tab:string): boolean {
    switch (tab) {
      case 'home':
        
        break;
      case 'report':
        
        break;
    
      default:
        break;
    }
    return false;
  }
}
