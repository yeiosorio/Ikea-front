export interface IFiltersCancel {
    touched: boolean; // true: Se a utilizado un filtro
    status?: string; // REQUESTED
    dateAscending?: string; // boolean; 
    notified?: string; // boolean;
    size?: string;
	
    referenceOrderId?: string; // ultimo id: para buscar siguiente lista. primer id: para buscar anterior lista
    nextPage?: string; // boolean ->  true: Siguiente. false: anterior
}
export class FiltersCancelModel implements IFiltersCancel {
    touched: boolean;
    status?: string;
    dateAscending?: string;
	notified?: string;
    size?: string;

    referenceOrderId?: string;
    nextPage?: string;
    constructor() {
        this.touched = false;
        this.status = '';
        this.dateAscending = 'false';
        this.notified = 'false';
        this.size = '2';

        this.referenceOrderId = '';
        this.nextPage = '';
    }
}

/***** IOMC - /orders/order-cancelled-list - GET *****/
// como se usa en la aplicacion
// USO
export interface IContactCancel {
	type:  string;
	value: string;
}
export interface IProductCancel {
	name:      string;
	detail:    string;
	sku:       string;
	quantity:  string;
	unitPrice?: string;
}
export interface IRejectReasonCancel {
	reasonCodeCategory:    string;
	reasonCodeSubCategory: string;
	additionalDescription: string;
	mediaURL:              string[];
}
export interface IStateCancel {
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
export interface IStateCancellationCancel {
	cancellationRequested:  string;
	updated:               	string;
	status:               	string;
	message:              	string;
	notified:       		boolean;
	reason: 				string;
}
export interface IStoreCancel {
	id?:				string;
	code?:             	string;
	name?:             	string;
	direction?:        	string;
	hoursOfAttention?: 	string;
}

export interface IAuthorizedPersonCancel {
	name:      string;
	documents: IContactCancel[];
	contacts?:  IContactCancel[];
}
export interface IDeliveryInformationCancel {
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
	authorizedPersons:    IAuthorizedPersonCancel[];
	store:                IStoreCancel;
}
export interface IPackageCancel {
	id:             string;
	updateDate:     string;
	stateCode:      string;
	stateName:      string;
	products:       IProductCancel[];
}

export interface IOrderCancel {
	id:                  string;
	logisticOrderId:     string;
	orderId:             string;
	purchaseDate:        string;
	cancellationState:   IStateCancellationCancel;
	cancellationHistory: IStateCancellationCancel[];
	currentState:        IStateCancel;
	previousStates:      IStateCancel[];
	deliveryInformation: IDeliveryInformationCancel;
	packages:            IPackageCancel[];
	rejectReason:        IRejectReasonCancel;
}

// como llega del endpoint
// RCB
export interface IContactCancelGetResponseModel {
	type:  string;
	value: string;
}
export interface IProductCancelGetResponseModel {
	name:      string;
	detail:    string;
	sku:       string;
	quantity:  string;
	unitPrice?: string;
}
export interface IRejectReasonCancelGetResponseModel {
	reasonCodeCategory:    string;
	reasonCodeSubCategory: string;
	additionalDescription: string;
	mediaURL:              string[];
}
export interface IStateCancelGetResponseModel {
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
export interface IStateCancellationCancelGetResponseModel {
	cancellationRequested:  string;
	updated:               	string;
	status:               	string;
	message:              	string;
	notified:       		boolean;
	reason: 				string;
}
export interface IStoreCancelGetResponseModel {
	id?:				string;
	code?:             	string;
	name?:             	string;
	direction?:        	string;
	hoursOfAttention?: 	string;
}

export interface IAuthorizedPersonCancelGetResponseModel {
	name:      string;
	documents: IContactCancel[];
	contacts:  IContactCancel[];
}
export interface IDeliveryInformationCancelGetResponseModel {
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
	authorizedPersons:    IAuthorizedPersonCancel[];
	store:                IStoreCancel;
}
export interface IPackageCancelGetResponseModel {
	id:             string;
	updateDate:     string;
	stateCode:      string;
	stateName:      string;
	products:       IProductCancel[];
}

export interface IOrderCancelGetResponseModel {
	id:                  string;
	logisticOrderId:     string;
	orderId:             string;
	purchaseDate:        string;
	cancellationState:   IStateCancellationCancelGetResponseModel;
	cancellationHistory: IStateCancellationCancelGetResponseModel[];
	currentState:        IStateCancelGetResponseModel;
	previousStates:      IStateCancelGetResponseModel[];
	deliveryInformation: IDeliveryInformationCancelGetResponseModel;
	packages:            IPackageCancelGetResponseModel[];
	rejectReason:        IRejectReasonCancelGetResponseModel;
}

// adapta la data que llega del endpoint al formato que se usa en la aplicacion
// RCB -> USO
export class OrderCancelGetAdapterModel implements IOrderCancel {
    id:                  string;
	logisticOrderId:     string;
	orderId:             string;
	purchaseDate:        string;
	cancellationState:   IStateCancellationCancel;
	cancellationHistory: IStateCancellationCancel[];
	currentState:        IStateCancel;
	previousStates:      IStateCancel[];
	deliveryInformation: IDeliveryInformationCancel;
	packages:            IPackageCancel[];
	rejectReason:        IRejectReasonCancel;

    constructor(data: IOrderCancelGetResponseModel) {
		this.id = data.id ? data.id: '';
		this.logisticOrderId = data.logisticOrderId ? data.logisticOrderId: '';
		this.orderId = data.orderId ? data.orderId: '';
		this.purchaseDate = data.purchaseDate ? data.purchaseDate: '';
		// this.cancellationState = new StateCancellationCancelGetAdapterModel(data.cancellationState);
		this.cancellationState = data.cancellationState ? data.cancellationState: {} as IStateCancellationCancel;
		// this.cancellationHistory = (data.cancellationHistory).map((item) => new StateCancellationCancelGetAdapterModel(item));
		this.cancellationHistory = data.cancellationHistory ? data.cancellationHistory: [] as IStateCancellationCancel[];
		this.currentState = data.currentState ? data.currentState: {} as IStateCancel;
		this.previousStates = data.previousStates ? data.previousStates: [] as IStateCancel[];
		this.deliveryInformation = data.deliveryInformation ? data.deliveryInformation: {} as IDeliveryInformationCancel;
		this.packages = data.packages ? data.packages: [] as IPackageCancel[];
		this.rejectReason = data.rejectReason ? data.rejectReason: {} as IRejectReasonCancel;
    }
}
// Se deberia agregar XXXGetAdapterModel de las variables 
// IStateCancellationCancelGetResponseModel, IStateCancelGetResponseModel, IDeliveryInformationCancelGetResponseModel, IPackageCancelGetResponseModel, IRejectReasonCancelGetResponseModel
// a
// IStateCancellationCancel, IStateCancel, IDeliveryInformationCancel, IPackageCancel, IRejectReasonCancel
// respectivamente, ya que no necesariamente como se usa van a llegar los datos

export class OrderCancelGetDefaultModel implements IOrderCancel {
    id:                  string;
	logisticOrderId:     string;
	orderId:             string;
	purchaseDate:        string;
	cancellationState:   IStateCancellationCancel;
	cancellationHistory: IStateCancellationCancel[];
	currentState:        IStateCancel;
	previousStates:      IStateCancel[];
	deliveryInformation: IDeliveryInformationCancel;
	packages:            IPackageCancel[];
	rejectReason:        IRejectReasonCancel;

    constructor() {
		this.id = '';
		this.logisticOrderId = '';
		this.orderId = '';
		this.purchaseDate = '';
		this.cancellationState =  {
			cancellationRequested: '',
			updated: '',
			status: '',
			message: '',
			notified: false,
			reason: '',
		} as IStateCancellationCancel;
		this.cancellationHistory = [
			{
				cancellationRequested: '',
				updated: '',
				status: '',
				message: '',
				notified: false,
				reason: '',
			} as IStateCancellationCancel
		] as IStateCancellationCancel[];
		this.currentState = {
			code: '',
			name: '',
			date: '',
			delay: false,
			messageDelay: '',
			actionCancellation: false,
			actionRefund: false,
			actionListRefund: false,
		} as IStateCancel;
		this.previousStates = [
			{
				code: '',
				name: '',
				date: '',
				delay: false,
				messageDelay: '',
				actionCancellation: false,
				actionRefund: false,
				actionListRefund: false,
			} as IStateCancel
		] as IStateCancel[];
		this.deliveryInformation = {
			code: '',
			name: '',
			date: '',
			clientName: '',
			clientDocument: '',
			clientEmail: '',
			type: '',
			address: '',
			instructions: '',
			pointOfSale: '',
			authorizedPersons: [
				{
					name: '',
					documents:[],
					contacts: []
				} as IAuthorizedPersonCancel
			] as IAuthorizedPersonCancel[],
			store: {
				id: '',
			}
		} as IDeliveryInformationCancel;
		this.packages = [
			{
				id: '',
				updateDate: '',
				stateCode: '',
				stateName: '',
				products: [
					{
						name: '',
						detail: '',
						sku: '',
						quantity: '',
						unitPrice: '',
					}
				]
			} as IPackageCancel
		] as IPackageCancel[];
		this.rejectReason = {} as IRejectReasonCancel;
    }
}
/***** IOMC - /orders/order-cancelled-list - GET *****/




/***** IOMC - /iomc/cancellations/80258/notification/true - PATCH *****/
// como se usa en la aplicacion
// USO
export interface IOrderNotification {
	error:     boolean;
	message:   string;
}

// como llega del endpoint
// RCB
export interface IOrderNotificationGetResponseModel {
	code:      string | null;
	error:     boolean;
	message:   string;
}

// adapta la data que llega del endpoint al formato que se usa en la aplicacion
// RCB -> USO
export class OrderNotificationGetAdapterModel implements IOrderNotification {
    error:     boolean;
	message:   string;

    constructor(data: IOrderNotificationGetResponseModel) {
		this.error = data.error;
		this.message = data.message ? data.message: '';
    }
}
/***** IOMC - /iomc/cancellations/80258/notification/true - PATCH *****/