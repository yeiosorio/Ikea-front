export interface IReasonsReturn {
	amount: number;
	return: string;
	submotive: string;
	conditions: string;
    sumValidate: boolean;
}
export interface IProductsReturn {
	check: boolean;
	sku: string;
	name: string;
	quantityReturn: number;
	quantityTotal: number;
	reasonsReturnList: IReasonsReturn[];
}
export interface IListProductsReturn {
	checkProductsGlobal: boolean;
    returnProductList: IProductsReturn[];
}

/***** IOMC - products/:idSku/detail - GET *****/
export interface ISkuDetailReturn {
	longDescription: string;
    sellerSkuId: string;
    sellerId: string;
    price: {
        currencyCode: string;
        value: string;
        fraction: string;
    }
}

export interface ISkuDetailReturnGetResponseModel {
    longDescription: string;
    sellerSkuId: string;
    sellerId: string;
    price: {
        currencyCode: string;
        value: string;
        fraction: string;
    }
}

export class SkuDetailReturnGetAdapterModel implements ISkuDetailReturn {
    longDescription: string;
    sellerSkuId: string;
    sellerId: string;
    price: {
        currencyCode: string;
        value: string;
        fraction: string;
    }

    constructor(data: ISkuDetailReturnGetResponseModel) {
        this.longDescription = data.longDescription ? data.longDescription: '';
        this.sellerId = data.sellerId ? data.sellerId: '';
        this.sellerSkuId = data.sellerSkuId ? data.sellerSkuId: '';
        this.price = {
			currencyCode: data.price.currencyCode ? data.price.currencyCode: '',
			value: data.price.value ? data.price.value: '',
			fraction: data.price.fraction ? data.price.fraction: '',
		};
    }
}


/***** IOMC - reverse/reasons - GET *****/
// como se usa en la aplicacion
// USO
export interface ISubmotive {
    code: string;
	name: string;
}
export interface IMotive {
    code: string;
	name: string;
    subReasons: ISubmotive[];
}
export interface ICondition {
	name: string;
    code: string;
    type: string;
}
export interface IReasons {
	reasons: IMotive[];
    conditions: ICondition[];
}

// como llega del endpoint
// RCB
export interface ISubmotiveGetResponseModel {
	name: string;
    code: string;
}
export interface IMotiveGetResponseModel {
	name: string;
    code: string;
    subReasons: ISubmotive[];
}
export interface IConditionGetResponseModel {
	name: string;
    code: string;
    type: string;
}
export interface IReasonsGetResponseModel {
    reasons: IMotiveGetResponseModel[];
    conditions: IConditionGetResponseModel[];
}
// adapta la data que llega del endpoint al formato que se usa en la aplicacion
// RCB -> USO
export class ReasonsGetAdapterModel implements IReasons {
    reasons: IMotive[];
    conditions: ICondition[];

    constructor(data: IReasonsGetResponseModel) {
        this.reasons = data.reasons ? data.reasons: [] as IMotive[];
        this.conditions = data.conditions ? data.conditions: [] as ICondition[];
    }
}
/***** /IOMC - reverse/reasons - GET *****/



// ************************ Disponibilidad request schema
export interface IAvailabilityRequest {
    geolocation:   Geolocation;
    productGroups: ProductGroup[];
}

export interface Geolocation {
    politicalArea: PoliticalArea;
}

export interface PoliticalArea {
    id?: string;
}

export interface ProductGroup {
    startFrom: string;
    daysCount: number;
    products:  IProduct[];
    services:  Service[];
}

export interface IProduct {
    item:      Item;
    condition: string;
    quantity:  number;
    itemId:    string;
    orderId:   string;
}

export interface Item {
    sellerId:    string;
    sellerSkuId: string;
}

export interface Service {
    deliveryType: string;
}



// ************************* Disponibilidad response schema

export interface IAvailabilityResponse {
    promiseId:     string;
    expiration:     string;
    productGroups: ProductGroups[];
}

export interface ProductGroups {
    logisticGroupId: string;
    logisticOptions: LogisticOption[];
}

export interface LogisticOption {
    logisticOptionId:  string;
    type:              string;
    category:          string;
    serviceNodeId:     string;
    deadline:          string;
    dateFrom:          string;
    dateTo:            string;
    timeRangeFrom:     string;
    timeRangeTo:       string;
    timeRangeTimeZone: string;
}

// ************************ Logistic Detail request schema 
/***** IOMC - orders/logistic/detail/:idOrder - GET *****/
// como se usa en la aplicacion
// USO
export interface IDeliveryInformationLogistic {
    code:           string;
    name:           string;
    date:           string;
    clientName:     string;
    typeDocument:   string;
    clientDocument: string;
    clientEmail:    string;
    address:        string;
    instructions:   string;
    pointOfSale:    string;
}

export interface IPackageLogistic {
    id:         string;
    updateDate: string;
    stateName:  string;
    products:   IProductLogistic[];
}

export interface IProductLogistic {
    name:         string;
    detail:       string;
    sellerSkuId:  string;
    sellerId:     string;
    unitPrice:    IUnitPriceLogistic;
    logisticQty:  string;
    availableQty: string;
    reverseQty:   string;
}

export interface IUnitPriceLogistic {
    currency:   string;
    centAmount: string;
    fraction:   string;
}
export interface ILogisticDetail {
    logisticOrderId:     string;
    sourceId:            string;
    deliveryInformation: IDeliveryInformationLogistic;
    packages:            IPackageLogistic[];
    items:               IProductLogistic[];
}
// como llega del endpoint
// RCB
export interface IDeliveryInformationLogisticGetResponse {
    code:           string;
    name:           string;
    date:           string;
    clientName:     string;
    typeDocument:   string;
    clientDocument: string;
    clientEmail:    string;
    address:        string;
    instructions:   string;
    pointOfSale:    string;
}
export interface IPackageLogisticGetResponse {
    id:         string;
    updateDate: string;
    stateName:  string;
    products:   IProductLogisticGetResponse[];
}
export interface IProductLogisticGetResponse {
    name:         string;
    detail:       string;
    sellerSkuId:  string;
    sellerId:     string;
    unitPrice:    IUnitPriceLogisticGetResponse;
    logisticQty:  string;
    availableQty: string;
    reverseQty:   string;
}

export interface IUnitPriceLogisticGetResponse {
    currency:   string;
    centAmount: string;
    fraction:   string;
}
export interface ILogisticDetailGetResponse {
    logisticOrderId:     string;
    sourceId:            string;
    deliveryInformation: IDeliveryInformationLogisticGetResponse;
    packages:            IPackageLogisticGetResponse[];
    items:               IProductLogisticGetResponse[];
}

// adapta la data que llega del endpoint al formato que se usa en la aplicacion
// RCB -> USO
export class LogisticDetailGetAdapterModel implements ILogisticDetail {
    logisticOrderId:     string;
    sourceId:            string;
    deliveryInformation: IDeliveryInformationLogistic;
    packages:            IPackageLogistic[];
    items:               IProductLogistic[];

    constructor(data: ILogisticDetailGetResponse) {
        this.logisticOrderId = data.logisticOrderId ? data.logisticOrderId: '';
        this.sourceId = data.sourceId ? data.sourceId: '';
        this.deliveryInformation = data.deliveryInformation ? data.deliveryInformation: {} as IDeliveryInformationLogistic;
        this.packages = data.packages ? data.packages: [] as IPackageLogistic[];
        this.items = data.items ? data.items: [] as IProductLogistic[];
    }
}

export interface IGeographic {
    geographicReferences: GeographicReference[];
}

export interface GeographicReference {
    politicalAreaId: string;
    type:            string;
    name:            string;
    code:            string;
    parent:          string;
    geoCenter:       GeoCenter;
}

export interface GeoCenter {
    latitude:  string;
    longitude: string;
}

// ************************ RLO create request schema 
export interface IRLOCreate {
    logisticOrderId:           string;
    sourceType:                string;
    sourceId:                  string;
    crmId:                     string;
    returnOptions:             ReturnOption[];
    applicant:                 Applicant;
    references:                Reference[];
    reverseLogisticOrderItems: ReverseItem[];
}

export interface Applicant {
    userId:       string;
    accountId:    string;
    userName:     UserName;
    primaryPhone: PrimaryPhone;
    document:     Document;
    email:        Email;
}

export interface Document {
    category:   string;
    country:    string;
    id:         string;
    isVerified: string;
    type:       string;
}

export interface Email {
    emailId:    string;
    isVerified: string;
}

export interface PrimaryPhone {
    countryCode:  string;
    number:       string;
    type:         string;
    availability: string;
    isVerified:   string;
}

export interface UserName {
    salutation: string;
    firstName:  string;
    middleName: string;
    lastName1:  string;
    lastName2:  string;
    suffix:     string;
}

export interface Reference {
    referenceType:  string;
    referenceValue: string;
}

export interface ReturnOption {
    type:                string;
    reservationId:       string;
    logisticGroupId:     string;
    logisticOptionId:    string;
    pickupAddress:       AddressInfo;
    pickupInstructions:  string;
    nodeId:              string;
    dropoffOperatorId:   string;
    dropoffOperatorType: string;
    addressInfo:         AddressInfo;
}

export interface AddressInfo {
    addressLine1:    string;
    addressLine2:    string;
    addressLine3:    string;
    politicalAreaId: string;
    latitude:        string;
    longitude:       string;
}

export interface ReverseItem {
    name?:              string;
    sellerSkuId:        string;
    sellerId:           string;
    returnReason:       ReturnReason;
    condition:          Condition[];
    unitPrice:          UnitPrice;
    quantity:           string;
    references?:        Reference[];
}

export interface Condition {
    conditionType:  string;
    conditionValue: string;
}

export interface ReturnReason {
    reasonCodeCategory:    string;
    reasonCodeSubCategory: string;
    additionalDescription: string;
}

export interface UnitPrice {
    currency:   string;
    centAmount: string;
}

// Generated by https://quicktype.io
// ************************ Reservation create request schema
export interface IReservationCreateRequest {
    expirationTime: string;
    promises:       Promise[];
}

export interface Promise {
    promiseId:      string;
    logisticGroups: LogisticGroup[];
}

export interface LogisticGroup {
    logisticGroupId:  string;
    logisticOptionId: string;
}

// Generated by https://quicktype.io
export interface IReverseStatus {
    reverseLogisticOrderId:    string;
    sourceId:                  string;
    logisticOrderId:           string;
    crmId:                     string;
    creationDate:              string;
    reverseLogisticOrderItems: ReverseLogisticOrderItem[];
}

export interface ReverseLogisticOrderItem {
    name:                    string;
    sellerSkuId:             string;
    packageId:               string;
    sellerId:                string;
    status:                  string;
    statusDesc:              string;
    trackingNumber:          string;
    unitPrice:               ReverseUnitPrice;
    returnReason:            ReverseReturnReason;
    condition:               ReverseCondition[];
    returnOption:            IReturnOption;
    originalDestinationNode: string;
    quantity:                string;
}

export interface IReturnOption {
    addressInfo: IAddressInfo;
    type: string;
    timeRangeSelection: string;
}

export interface IAddressInfo {
    addressLine1: string;
    politicalAreaId: string;
    latitude: string;
    longitude: string;
}

export interface ReverseCondition {
    conditionType:  string;
    conditionValue: string;
}

export interface ReverseReturnReason {
    reasonCodeCategory:    string;
    reasonCodeSubCategory: string;
    additionalDescription: string;
    mediaURL:              string;
}

export interface ReverseUnitPrice {
    currency:   string;
    centAmount: string;
    fraction:   string;
}



