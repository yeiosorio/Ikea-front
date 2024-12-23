import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  IFiltersFraud,
  FiltersFraudModel,
  IOrderFraud,
  IOrderFraudGetResponseModel,
  OrderFraudGetAdapterModel,
  OrderFraudGetDefaultModel,
  IOrderFraudStatus,
  IOrderFraudStatusGetResponseModel,
  OrderFraudStatusGetAdapterModel,
} from '@shared/models/fraud.model';
import { FilterFraudData, IOption } from '@shared/data/filter-fraud.class';
import { IMessage } from '@shared/models/messages.model';
import { FraudService } from '@shared/services/fraud/fraud.service';
import { Observable, Subject, take } from 'rxjs';
import { FiltersFraudService } from '@shared/services/filters/filters-fraud.service';
import { FiltersComponent } from '@features/fraud/components/filters/filters.component';
import { Router } from '@angular/router';
import { LoginService } from '@shared/services/login/login.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  // Componente de filtros, se usara para limpiar y actualizar
  @ViewChild('componentFilter', {static: true}) public componentFilter!: FiltersComponent;
  private _componentFilter$ = new Subject<string>();

  listOrderFraud: IOrderFraud[] = [] as IOrderFraud[];
  orderFraudDetail: IOrderFraud = new OrderFraudGetDefaultModel();

  filtersOrderFraud: IFiltersFraud = new FiltersFraudModel();
  visibleModal: boolean = false;
  tooltip: boolean = false;

  // Mensajes informativos en pantalla
  listMessage = {
    'message-empty': {
      center: true,
      icons: true,
      message: '¡Vaya!, aún no tienes solicitudes de Órdenes de compra',
      detail: 'Todo muy bien.',
      button: false,
    },
    'message-empty-filter': {
      center: true,
      icons: false,
      message: '¡Vaya!, No encontramos coincidencias',
      detail: 'No hay Órdenes que coincidan con los filtros aplicados.<br> Por favor vuelve a intentarlo.'
    },
    'error-server-filter': {
      center: true,
      icons: false,
      message: 'Tenemos problemas para mostrar esta página',
      detail: 'En este momento no podemos mostrarte la página de filtros. Por favor, inténtalo nuevamente.',
      button: true,
    },
    'error-server': {
      center: true,
      icons: false,
      message: 'Tenemos problemas para mostrar la información',
      detail: 'No pudimos desplegar la información solicitada. Por favor, inténtalo nuevamente.',
      button: true,
    }
  };
  errorMessage!: IMessage;

  visibleBtnAdd = false;
  isLoading = false;
  visibleDetail = false;
  visibleFilters = false;

  body = document.getElementsByTagName('body')[0];
  
  constructor(
    private fraudService: FraudService,
    public filterData: FiltersFraudService,
    public router: Router,
    private loginService: LoginService,
  ) {
    this.filterData.setCleanCheck();
  }

  ngOnInit(): void {
    console.log();
    // this.errorMessage = this.listMessage['message-empty'];
    this.initListOrdersFraud();

    // Suscripcion del componente filter para actualizar los filtros 
    this._componentFilter$.subscribe((delFilter: string) => {
      // console.log('refreshFilters 03');
      // if (!this.filterData.getFilterDefaultStatus()) {
        this.componentFilter.refreshExternalFilter(delFilter);
      // }
    });
  }

  refreshFilters(delFilter: string){
    // console.log('refreshFilters 01');
    this._componentFilter$.next(delFilter);
  }

  initListOrdersFraud(){
    this.paginationListOrdersFraud(this.filtersOrderFraud);
  }

  paginationListOrdersFraud(filters:IFiltersFraud){
    this.isLoading = true;
    this.fraudService.getOrderFraud(filters).pipe(take(1))
      .subscribe({
        next: (res: IOrderFraud[])=> {
          console.log('paginationListOrdersFraud: ', res);
          if (res.length>0) {
            this.listOrderFraud.push(...res);
            if (!this.filtersOrderFraud.touched) {
              this.visibleBtnAdd = true;
            }
          } else {
            // QUITAR EL BOTON MOSTRAR MAS
            this.visibleBtnAdd = false;
            this.errorMessage = this.listMessage['message-empty-filter'];
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMessage = this.listMessage['error-server-filter'];
        },
        complete: () => {console.log('complete');}
      });
  }

  nextPagination() {
    const code = this.listOrderFraud[this.listOrderFraud.length - 1].merchantReferenceNumber;

    console.log('>>> codeNext:', code);
    this.filtersOrderFraud.touched = true;
    this.filtersOrderFraud.nextPage = 'true';
    this.filtersOrderFraud.referenceOrderId = code;
    this.paginationListOrdersFraud(this.filtersOrderFraud);
  }
  // Limpia el listado de ordenes fraudulentas
  cleanListOrderFraud(){
    this.listOrderFraud = [] as IOrderFraud[];
    this.orderFraudDetail = new OrderFraudGetDefaultModel();
    this.visibleBtnAdd = true;
  }

  deleteFilter(code: string){
    this.filterData.setOptionCheck(code, false);
    
    this.refreshFilters(code);
    this.cleanListOrderFraud();
    this.filtersOrderFraud = this.filterData.deleteCodeFilter(this.filtersOrderFraud, code);
    this.paginationListOrdersFraud(this.filtersOrderFraud);
  }
  deleteAllFilter(){
    this.filterData.setCleanCheck();

    this.refreshFilters('all');
    this.cleanListOrderFraud();
    this.filtersOrderFraud = new FiltersFraudModel();
    this.paginationListOrdersFraud(this.filtersOrderFraud);
  }

  openViewDetail(orderFraud: IOrderFraud){
    this.orderFraudDetail = orderFraud;
    console.log('>>> this.orderFraudDetail:', this.orderFraudDetail);
    this.visibleDetail = true;
    this.visibleFilters = false;

    this.activeScrollBody(true);
  }
  closeViewDetail(){
    this.visibleDetail = false;
    this.visibleFilters = false;

    this.activeScrollBody(false);
  }
  
  openViewFilters(){
    this.visibleDetail = false;
    this.visibleFilters = true;

    this.activeScrollBody(true);
  }
  closeViewFilters(){
    this.visibleDetail = false;
    this.visibleFilters = false;

    this.activeScrollBody(false);
  }

  refreshUpdateOrderFraud(ev: {id: string, selectStatus:string}){
    // LIMPIAR EL LISTADO DE DATOS
    this.cleanListOrderFraud();

    // GUARDA LOS CAMBIOS
    this.fraudService.patchOrderFraudStatus(ev.id, ev.selectStatus).pipe(take(1))
    .subscribe({
      next: (res: IOrderFraudStatus)=> {
        console.log('patchOrderFraudStatus: ', res);
        this.paginationListOrdersFraud(this.filtersOrderFraud);
      },
      error: (err) => {
        console.log('error patchOrderFraudStatus: ', err);
      },
      complete: () => {console.log('complete');}
    });

    // CERRAR EL MODAL
    this.closeViewDetail();
  }
  refreshUpdateFiltersFraud(fil: IFiltersFraud){
    console.log('PASO 2');
    this.cleanListOrderFraud();
    this.filtersOrderFraud = fil;

    this.paginationListOrdersFraud(this.filtersOrderFraud);
    this.closeViewFilters();
  }

  returnReport(){
    this.router.navigate(['/reports/report-home']);
  }

  closeReport(){
    this.loginService.removeLoginReport();
    this.router.navigate(['/reports/access']);
  }

  activeScrollBody(action: boolean){
    if (action) {
      this.body.style.overflow = 'hidden';
    } else {
      this.body.style.overflow = 'visible';
    }
  }

  ngAfterViewInit() {
    // console.log('refreshFilters 02');
    this._componentFilter$.next('');
  }
}
