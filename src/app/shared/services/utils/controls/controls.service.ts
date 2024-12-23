import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  openDetailOrden: boolean = false;
  openFilterOrden: boolean = false;

  constructor() {}

  getOpenDetail(){
    return this.openDetailOrden;
  }
  setOpenDetail(open: boolean){
    this.openDetailOrden = open;

    this.openFilterOrden = false;
  }

  getOpenFilter(){
    return this.openFilterOrden;
  }
  setOpenFilter(open: boolean){
    this.openFilterOrden = open;

    this.openDetailOrden = false;
  }
}
