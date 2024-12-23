import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

  public loading = false;

  constructor() { }

  open() {
    this.loading = true;
  }

  close() {
    this.loading = false;
  }

}
