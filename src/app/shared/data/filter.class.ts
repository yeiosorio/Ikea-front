export interface IOption {
    code: string;
    text: string;
    group: string;
    check: boolean;
}
export class FilterData {

    // FIX: Corregir los estados de cancelacion
    optionsFilter: IOption[] = [
        {
            code: 'false',
            text: 'Solicitud: la más nueva primero',
            group: 'dateAscending',
            check: false
        },
        {
            code: 'true',
            text: 'Solicitud: la más antigua primero',
            group: 'dateAscending',
            check: false
        },
        {
            code: 'APPROVED',
            text: 'Aprobado',
            group: 'status',
            check: false
        },
        {
            code: 'REJECTED',
            text: 'Rechazado',
            group: 'status',
            check: false
        },
        {
            code: 'PENDING',
            text: 'Pendiente',
            group: 'status',
            check: false
        },
    ];

    constructor() { }

}
