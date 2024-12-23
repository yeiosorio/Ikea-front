export interface IState {
	code:               string;
	name:               string;
	date:               string;
	delay:              boolean;
	messageDelay:       string;
	actionCancellation: boolean;
	actionRefund:       boolean;
	actionListRefund:   boolean;
	deliveryAttempt:    boolean;
}
export interface IStateCancellation {
	cancellationRequested:  string;
	updated:               	string;
	status:               	string;
	message:              	string;
	notified:       		boolean;
	reason: 				IReason;
}

export interface IReason {
	reasonCodeCategory: string;
	reasonCodeSubCategory: string;
}

export interface IDeliveryInformation {
	name:                 string;
	code:                 string;
	date:                 string;
	clientName:           string;
	clientDocument:       string;
	clientEmail:          string;
	type:                 string;
	address:              string;
	instructions:         string;
	pointOfSale:          string;
	attempts: 			  string;
	alertMsgCode: 		  string;
	clientPhone: 		  string;
	authorizedPersons:    IAuthorizedPerson[];
	store:                IStore;
	promisedDate:		  IPromiseDate;
}

export interface IAuthorizedPerson {
	name:      string;
	documents: IContact[];
	contacts:  IContact[];
}

export interface IContact {
	type:  string;
	value: string;
}

export interface IStore {
	id:               string;
	name:             string;
	streetAddress:    string;
	storeTiming: 	  string;
}

export interface IPromiseDate {
	dateFrom: 	string
	dateTo: 	string
	serviceCategory: string
	timeRange: string
	timeRangeFrom: string
	timeRangeTo: string
}

export interface IPackage {
	id:             string;
	updateDate:     string;
	stateCode:      string;
	stateName:      string;
	alertCode:      string;
	products:       IProduct[];
}

export interface IProduct {
	name:      string;
	detail:    string;
	sku:       string;
	quantity:  number;
	unitPrice?: string;
	statusCode?: string;
	statusDescription?: string;
}

export interface IRejectReason {
	reasonCodeCategory:    string;
	reasonCodeSubCategory: string;
	additionalDescription: string;
	mediaURL:              string[];
}
export interface IOrderItemsAnnulled {
	name?: string;
	logisticOrderId: string;
	sourceOrderId: string;
	logisticOrderItemId: string;
	sourceItemId: string;
	sellerSkuId: string;
	logisticSkuId: string;
	quantity: number;
	reason: IRejectReason;
	executedAt: string;
}
export interface IOrderCompleteGetResponseModel {
	id:                  string;
	logisticOrderId:     string;
	orderId:             string;
	purchaseDate:        string;
	cancellationState:   IStateCancellation;
	cancellationHistory: string;
	currentState:        IState;
	previousStates:      IState[];
	deliveryInformation: IDeliveryInformation;
	packages:            IPackage[];
	orderItems:          IProduct[];
	rejectReason:        IRejectReason;
	
}

export interface IOrderComplete {
	id:                  string;
	logisticOrderId:     string;
	orderId:             string;
	purchaseDate:        string;
	cancellationState:   IStateCancellation;
	cancellationHistory: string;
	currentState:        IState;
	previousStates:      IState[];
	deliveryInformation: IDeliveryInformation;
	packages:            IPackage[];
	orderItems:       	 IProduct[];
	rejectReason:        IRejectReason;
}
export class OrderCompleteGetAdapterModel implements IOrderComplete {
	id:                  string;
	logisticOrderId:     string;
	orderId:             string;
	purchaseDate:        string;
	currentState:        IState;
	previousStates:      IState[];
	deliveryInformation: IDeliveryInformation;
	packages:            IPackage[];
	orderItems:            IProduct[];
	rejectReason:        IRejectReason;
	cancellationState:   IStateCancellation;
	cancellationHistory: string;
	constructor(data: IOrderCompleteGetResponseModel) {
		this.id = data.id;
		this.logisticOrderId = data.logisticOrderId;
		this.orderId = data.orderId;
		this.purchaseDate = data.purchaseDate;
		this.currentState = data.currentState;
		this.previousStates = data.previousStates;
		this.deliveryInformation = data.deliveryInformation;
		this.packages = data.packages;
		this.orderItems = data.orderItems;
		this.rejectReason = data.rejectReason;
		this.cancellationState = data.cancellationState;
		this.cancellationHistory = data.cancellationHistory;
	}
}


/***** IOMC - /orders/cancellation - POST *****/
// como se usa en la aplicacion
// USO
export interface IError {
	field: string;
    message: string;
}
export interface ICancelled {
	logisticCancelRequestId: string;
	timestamp: string;
	uid: string;
	code: number;
	error: string;
	message: string;
	path: string;
	errors: IError[];
}

// como llega del endpoint
// RCB
export interface IErrorGetResponseModel {
	field: string;
    message: string;
}
export interface ICancelledGetResponseModel {
	logisticCancelRequestId: string;
	timestamp: string;
	uid: string;
	code: number;
	error: string;
	message: string;
	path: string;
	errors: IErrorGetResponseModel[];
}

// adapta la data que llega del endpoint al formato que se usa en la aplicacion
// RCB -> USO
export class CancelledGetAdapterModel implements ICancelled {
    logisticCancelRequestId: string;
	timestamp: string;
	uid: string;
	code: number;
	error: string;
	message: string;
	path: string;
	errors: IErrorGetResponseModel[];

    constructor(data: ICancelledGetResponseModel) {
		this.logisticCancelRequestId = data.logisticCancelRequestId ? data.logisticCancelRequestId: '';
		this.timestamp = data.timestamp ? data.timestamp: '';
		this.uid = data.uid ? data.uid: '';
		this.code = data.code ? data.code: 0;
		this.error = data.error ? data.error: '';
		this.message = data.message ? data.message: '';
		this.path = data.path ? data.path: '';
		this.errors = data.errors ? data.errors: [] as IError[];
    }
}
/***** IOMC - /orders/cancellation - POST *****/

