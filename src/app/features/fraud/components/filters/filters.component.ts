import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FiltersFraudModel, IFiltersFraud } from '@shared/models/fraud.model';
import { FiltersService } from '@shared/services/filters/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() openFilterOrden = false;
  @Output() filtersEvent = new EventEmitter<IFiltersFraud>();
  @Output() closeViewEvent = new EventEmitter();

  optionsCheck = {
    dateAscending: '',
    status: '',
  };

  filterGroup: IFiltersFraud = new FiltersFraudModel();
  
  constructor(
    public filterData: FiltersService,
  ) { }

  ngOnInit(): void {
    console.log();
  }

  onFilterClean(){
    // filter view
    this.optionsCheck = {
      dateAscending: '',
      status: '',
    };

    this.filterGroup = new FiltersFraudModel();

    // this.filtersEvent.emit(this.filterGroup);
  }
  onFilterUpdate(){
    // Fix: Revisar filtro cuando se borra y luego se hace update
    console.log('PASO 1');
    this.filterData.setCleanCheck();

    this.filterGroup.touched = true;
    this.filterGroup.nextPage = '';
    this.filterGroup.referenceOrderId = '';

    const filDefault = new FiltersFraudModel();
    if (this.optionsCheck.dateAscending === '') {
      this.filterGroup.dateAscending = filDefault.dateAscending;
      this.filterData.setOptionCheck(this.optionsCheck.dateAscending, false);
    } else {
      this.filterGroup.dateAscending = this.optionsCheck.dateAscending;
      this.filterData.setOptionCheck(this.optionsCheck.dateAscending);
    }
    if (this.optionsCheck.status === '') {
      this.filterGroup.status = filDefault.status;
      this.filterData.setOptionCheck(this.optionsCheck.status, false);
    } else {
      this.filterGroup.status = this.optionsCheck.status;
      this.filterData.setOptionCheck(this.optionsCheck.status);
    }


    this.filtersEvent.emit(this.filterGroup);
  }

  refreshExternalFilter(deleteFilter: string){
    // FIX: FILTRO getOptionFilter
    // console.log('refreshExternalFilter: ', deleteFilter);
    if(deleteFilter !== ''){
      if (deleteFilter === 'all') {
        this.onFilterClean();
      } else{
        const group = this.filterData.getOptionFilter(deleteFilter).group;
        const fil = new FiltersFraudModel();

        switch (group) {
            case 'dateAscending': 
              this.optionsCheck.dateAscending = '';
              this.filterGroup.dateAscending = fil.dateAscending;
              break;
            case 'status':
              this.optionsCheck.status = '';
              this.filterGroup.status = fil.status;
              break;
            default: this.filterGroup = fil;
              break;
        }

      }
    }

  }

  closeFilter() {
    this.closeViewEvent.emit();
  }
  stopPropagation(e: Event) {
    e.stopPropagation();
  }
}
