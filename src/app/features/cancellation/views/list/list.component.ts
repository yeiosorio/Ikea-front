import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FiltersCancelModel,
  IFiltersCancel,
  IOrderCancel,
  IOrderNotification,
  OrderCancelGetDefaultModel
} from '@shared/models/cancellation.model';
import { FilterData, IOption } from '@shared/data/filter.class';
import { IMessage } from '@shared/models/messages.model';
import { CancellationService } from '@shared/services/cancellation/cancellation.service';
import { Observable, Subject, take } from 'rxjs';
import { FiltersService } from '@shared/services/filters/filters.service';
import { FiltersComponent } from '@features/cancellation/components/filters/filters.component';
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

  listOrderCancel: IOrderCancel[] = [] as IOrderCancel[];
  orderCancelDetail: IOrderCancel = new OrderCancelGetDefaultModel();

  filtersOrderCancel: IFiltersCancel = new FiltersCancelModel();

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
    private cancellationService: CancellationService,
    public filterData: FiltersService,
    public router: Router,
    private loginService: LoginService,
  ) {
    this.filterData.setCleanCheck();
  }

  ngOnInit(): void {
    // this.errorMessage = this.listMessage['message-empty'];
    this.initListOrdersCancel();

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

  initListOrdersCancel(){
    this.paginationListOrdersCancel(this.filtersOrderCancel);
  }

  paginationListOrdersCancel(filters:IFiltersCancel){
    this.isLoading = true;
    console.log('updatepagination: ', filters);
    this.cancellationService.getOrderCancel(filters).pipe(take(1))
      .subscribe({
        next: (res: IOrderCancel[])=> {
          console.log('paginationListOrdersCancel: ', res);
          if (res.length > 0) {
            console.log('FASE 01');
            this.listOrderCancel.push(...res);
            if (!this.filtersOrderCancel.touched) {
              this.visibleBtnAdd = true;
            }
          } else {
            // QUITAR EL BOTON MOSTRAR MAS
            console.log('FASE 02');
            this.visibleBtnAdd = false;
            this.errorMessage = this.listMessage['message-empty-filter'];
          }
          console.log('FASE 03');
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
    const code = this.listOrderCancel[this.listOrderCancel.length - 1].orderId;

    console.log('>>> codeNext:', code);
    this.filtersOrderCancel.touched = true;
    this.filtersOrderCancel.nextPage = 'true';
    this.filtersOrderCancel.referenceOrderId = code;
    this.paginationListOrdersCancel(this.filtersOrderCancel);
  }
  // Limpia el listado de ordenes canceladas
  cleanListOrderCancel(){
    this.listOrderCancel = [] as IOrderCancel[];
    this.orderCancelDetail = new OrderCancelGetDefaultModel();
    this.visibleBtnAdd = true;
  }

  deleteFilter(code: string){
    this.filterData.setOptionCheck(code, false);
    
    this.refreshFilters(code);
    this.cleanListOrderCancel();
    this.filtersOrderCancel = this.filterData.deleteCodeFilter(this.filtersOrderCancel, code);
    this.paginationListOrdersCancel(this.filtersOrderCancel);
  }
  deleteAllFilter(){
    this.filterData.setCleanCheck();

    this.refreshFilters('all');
    this.cleanListOrderCancel();
    this.filtersOrderCancel = new FiltersCancelModel();
    this.paginationListOrdersCancel(this.filtersOrderCancel);
  }

  openViewDetail(orderCancel: IOrderCancel){
    this.orderCancelDetail = orderCancel;
    console.log('>>> this.orderCancelDetail:', this.orderCancelDetail);
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

  refreshUpdateOrderCancel(orderId: string){
    // LIMPIAR EL LISTADO DE DATOS
    this.cleanListOrderCancel();

    // GUARDA LOS CAMBIOS - Solo para este caso, siempre sera true la notificacion a solicitar, en otros casos considerar un "false" desde el componente de detail
    this.cancellationService.patchOrderNotification(orderId, true).pipe(take(1))
    .subscribe({
      next: (res: IOrderNotification)=> {
        // console.log('patchOrderNotification: ', res);
        this.paginationListOrdersCancel(this.filtersOrderCancel);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {console.log('complete');}
    });

    // CERRAR EL MODAL
    this.closeViewDetail();
  }
  refreshUpdateFiltersCancel(fil: IFiltersCancel){
    // console.log('PASO 2', fil);
    this.cleanListOrderCancel();
    this.filtersOrderCancel = fil;

    this.paginationListOrdersCancel(this.filtersOrderCancel);
    this.closeViewFilters();
  }

  returnReport(){
    this.router.navigate(['/reports/report-home']);
  }

  closeReport(){
    this.loginService.removeLoginReport();
    this.router.navigate(['/reports/access']);
  }

  convertText(text:string | undefined): string{
    // FIX: AGREGAR LAS DEMAS VARIACIONES
    switch (text) {
      case 'REQUESTED':
        return 'Solicitado';
        break;
      case 'PENDING':
        return 'Pendiente';
        break;
      case 'APPROVED':
        return 'Aprobado';
        break;
      case 'REJECTED':
        return 'Rechazado';
        break;
    
      default: return (text)? text: '';
        break;
    }

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
