export interface IOption {
    code: string;
    text: string;
    group: string;
    check: boolean;
}
export class FilterFraudData {

    // FIX: Corregir los estados de cancelacion
    optionsFilter: IOption[] = [
        {
            code: 'false',
            text: 'La más nueva primero',
            group: 'dateAscending',
            check: false
        },
        {
            code: 'true',
            text: 'La más antigua primero',
            group: 'dateAscending',
            check: false
        },
        {
            code: 'REJECTED',
            text: 'Pendiente de gestión',
            group: 'status',
            check: false
        },
        {
            code: 'ORDER_CANCELLED',
            text: 'Orden cancelada',
            group: 'status',
            check: false
        },
        {
            code: 'ASSUMED',
            text: 'Riesgo asumido',
            group: 'status',
            check: false
        },
    ];

    constructor() { }

}
