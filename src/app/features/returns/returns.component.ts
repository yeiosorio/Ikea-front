import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IOrderComplete } from '@shared/models/orders.model';
import { ReturnService } from '@shared/services/return/return.service';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent {

  message: boolean = false;
  order!: IOrderComplete;

  constructor(
    public router: Router,
    private returnService: ReturnService,
  ) { }
}
