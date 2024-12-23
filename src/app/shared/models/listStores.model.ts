
export interface Address {
    country:      string;
    state:        string;
    county:       string;
    district:     string;
    latitude:     number;
    longitude:    number;
    addressLine1: string;
    addressLine2: string;
    addressLine3?: string;
}

export interface OperationsTime {
    weekday:   string;
    openHour:  string;
    closeHour: string;
}

export interface IListStoresComplete {
    nodeId:          string;
    nodeName:        string;
    nodeType:        string;
    address:         Address;
    operationsTimes: OperationsTime[];
}

