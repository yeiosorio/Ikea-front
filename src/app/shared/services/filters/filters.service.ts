import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FilterData, IOption } from '@shared/data/filter.class';
import { FiltersCancelModel, IFiltersCancel } from '@shared/models/cancellation.model';
// import { ITypeService } from '@shared/models/services.model';

@Injectable({
    providedIn: 'root'
})
export class FiltersService {

    filterData = new FilterData();
    optionsFilter: IOption[] = this.filterData.optionsFilter;

    optionsCheck: IOption[] = [] as IOption[];

    constructor(
        private router: Router
    ) { }

    getGroupFilter(codeGroup: string) {
        let result = this.optionsFilter.filter(data => data.group === codeGroup);

        return result;
    }

    getOptionFilter(codeOption: string) {
        let result = this.optionsFilter.filter(data => data.code === codeOption);

        return result[0];
    }

    // // Agrega los valores al grupo serviceBy que se trae del servidor desde el componente filters.component
    // updateServiceByFilter(ServBy: ITypeService[]){
    //     ServBy.forEach(element => {
    //         this.optionsFilter.push({
    //             code: element.descriptionBc+'',
    //             text: element.description+'',
    //             group: 'serviceBy',
    //             check: false
    //         });
    //     });
    // }

    getOptionsCheck(): IOption[] {
        let result: IOption[] = [];
        this.optionsFilter.forEach(element => {
            if (element.check === true) {
                result.push(element);
            }
        });

        return result;
    }
    setCleanGroup(codeGroup: string) {
        if (codeGroup != '') {
            this.optionsFilter.forEach((element, index) => {
                if (element.group === codeGroup) {
                    this.optionsFilter[index].check = false;
                }
            });
        }
    }

    setOptionCheck(codeOption: string, valueOption: boolean = true) {
        if (codeOption != '') {
            this.optionsFilter.forEach((element, index) => {
                if (element.code === codeOption) {
                    this.setCleanGroup(element.group);
                    this.optionsFilter[index].check = valueOption;
                }
            });
        }
        this.optionsCheck = this.getOptionsCheck();
    }

    setCleanCheck() {
        this.optionsFilter.forEach((_element, index) => {
            this.optionsFilter[index].check = false;
        });
        this.optionsCheck = this.getOptionsCheck();
    }

    // Devuelve a sus valores por default el filtro que pertenece a un grupo
    deleteCodeFilter(filters:IFiltersCancel, code: string) :IFiltersCancel {
        const group = this.getOptionFilter(code).group;
        const fil = new FiltersCancelModel();
        
        switch (group) {
            case 'dateAscending': filters.dateAscending = fil.dateAscending;
                break;
            case 'status': filters.status = fil.status;
                break;
            default: filters = fil;
                break;
        }

        return filters;
    }
}
