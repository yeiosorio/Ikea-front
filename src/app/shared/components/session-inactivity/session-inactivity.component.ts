import { Component, OnInit } from '@angular/core';
import { InactivityService } from '@shared/services/utils/inactivity/inactivity.service';
import { timer, Subscription } from 'rxjs';
import { environment } from '@env/environment';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-session-inactivity',
  templateUrl: './session-inactivity.component.html',
  styleUrls: ['./session-inactivity.component.scss']
})
export class SessionInactivityComponent implements OnInit {

  iTimer!: number;
  private Clock$!: Subscription;

  constructor(
    public inactivity: InactivityService,
    private authService: MsalService,
  ) { }

  ngOnInit(): void {
    console.log('inactivity service funcionando');
    const inactivityTimer: number = environment.inactivity.inactivityTimer;
    this.inactivity.startWatching(inactivityTimer).subscribe((res: boolean) => {
      // console.log('-- startwatching: ', res);
      if (res) {
        // console.log('-- open modal');
        this.openModalInactivity();
      }
    });
  }

  openModalInactivity() {
    // this.modalInactivity.nativeElement.open();
    this.startClock();
  }

  // cuando decide seguir activo "Quiero continuar"
  inactivityContinuar() {
    // this.modalInactivity.nativeElement.close();
    this.stopClock();
  }

  // cuando decide cerrar session "Ya he acabado"
  inactivityClose() {
    this.inactivity.stopTimer();
    this.stopClock();
    // this.modalInactivity.nativeElement.close();
    // Cerrar session "Logout"
    // FIX: LOGOUT DEBERIA ELIMINAR TODA LA INFO INCLUIDA DEL LOCALSTORAGE
    this.authService.logout();
  }

  private startClock() {
    this.iTimer = environment.inactivity.clockTimer;
    this.stopClock();
    this.Clock$ = timer(1000, 1000).subscribe(() => {
      this.iTimer = this.iTimer - 1;
      // console.log('clock',this.iTimer);
      if (this.iTimer === 0) {
        this.inactivityClose();
      }
    });
  }

  private stopClock() {
    if (this.Clock$) {
      this.Clock$.unsubscribe();
    }
  }

}
