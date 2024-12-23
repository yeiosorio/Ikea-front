export interface IFiltersFraud {
    touched: boolean; // true: Se a utilizado un filtro
    status?: string; // REQUESTED
    dateAscending?: string; // boolean;
    size?: string;
	
    referenceOrderId?: string; // ultimo id: para buscar siguiente lista. primer id: para buscar anterior lista
    nextPage?: string; // boolean ->  true: Siguiente. false: anterior
}
export class FiltersFraudModel implements IFiltersFraud {
    touched: boolean;
    status?: string;
    dateAscending?: string;
    size?: string;

    referenceOrderId?: string;
    nextPage?: string;
    constructor() {
        this.touched = false;
        this.status = '';
        this.dateAscending = 'false';
        this.size = '3';

        this.referenceOrderId = '';
        this.nextPage = '';
    }
}

/***** IOMC - /frd-detection/detections/detection-list - GET *****/
// como se usa en la aplicacion
// USO
export interface IOrderFraud {
	merchantId: string;
	date: string;
	merchantReferenceNumber: string;
	statusCode: string;
	statusName: string;
	orderId: string;
}

// como llega del endpoint
// RCB

export interface IOrderFraudGetResponseModel {
	merchantId: string;
	date: string;
	merchantReferenceNumber: string;
	statusCode: string;
	statusName: string;
	orderId: string;
}

// adapta la data que llega del endpoint al formato que se usa en la aplicacion
// RCB -> USO
export class OrderFraudGetAdapterModel implements IOrderFraud {
    merchantId: string;
	date: string;
	merchantReferenceNumber: string;
	statusCode: string;
	statusName: string;
	orderId: string;

    constructor(data: IOrderFraudGetResponseModel) {
		this.merchantId = data.merchantId ? data.merchantId: '';
		this.date = data.date ? data.date: '';
		this.merchantReferenceNumber = data.merchantReferenceNumber ? data.merchantReferenceNumber: '';
		this.statusCode = data.statusCode ? data.statusCode: '';
		this.statusName = data.statusName ? data.statusName: '';
		this.orderId = data.orderId ? data.orderId: '';
    }
}

export class OrderFraudGetDefaultModel implements IOrderFraud {
    merchantId: string;
	date: string;
	merchantReferenceNumber: string;
	statusCode: string;
	statusName: string;
	orderId: string;

    constructor() {
		this.merchantId = '';
		this.date = '';
		this.merchantReferenceNumber = '';
		this.statusCode = '';
		this.statusName = '';
		this.orderId = '';
    }
}
/***** IOMC - /frd-detection/detections/detection-list - GET *****/




/***** IOMC - /frd-detection/detections/:idOrder/:status - PATCH *****/
// como se usa en la aplicacion
// USO
export interface IOrderFraudStatus {
	error:     boolean;
	message:   string;
}

// como llega del endpoint
// RCB
export interface IOrderFraudStatusGetResponseModel {
	code:      string | null;
	error:     boolean;
	message:   string;
}

// adapta la data que llega del endpoint al formato que se usa en la aplicacion
// RCB -> USO
export class OrderFraudStatusGetAdapterModel implements IOrderFraudStatus {
    error:     boolean;
	message:   string;

    constructor(data: IOrderFraudStatusGetResponseModel) {
		this.error = data.error;
		this.message = data.message ? data.message: '';
    }
}
/***** IOMC - /frd-detection/detections/:idOrder/:status - PATCH *****/