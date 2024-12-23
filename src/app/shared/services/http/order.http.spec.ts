import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { environment } from '@env/environment';
import { OrderHttp } from './order.http';
import {
  // CompleteOrderGetAdapterModel,
  IOrderComplete,
  IOrderCompleteGetResponseModel,
} from '@shared/models/orders.model';
import { Observable, Subscription } from 'rxjs';

const apiMock = 'http://localhost:8080';

describe('OrderHttp', () => {
  let httpTestingController: HttpTestingController;
  let service: OrderHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderHttp],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OrderHttp);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('#should be return observable that matches the correct data - getOrder', () => {
  //   const mockData: IOrderCompleteGetResponseModel = {
  //     "orderId": "0000433",
  //     "purchaseDate": "02/07/2021",
  //     "deliveryDate": "05/07/2021",
  //     "deliveryMethod": {
  //       "deliveryCode": "HD",
  //       "deliveryName": "Home Delivery"
  //     },
  //     "currentState": {
  //       "stateCode": "TRST",
  //       "stateName": "En transito",
  //       "stateDate": "05/07/2021",
  //       "delay": false,
  //       "messageDelay": "Esta Orden se encuentra con atraso en la entrega",
  //       "actionCancellation": false,
  //       "actionRefund": false,
  //       "actionListRefund": false
  //     },
  //     "previousStates": [
  //       {
  //         "stateCode": "CFMD",
  //         "stateName": "confirmado",
  //         "stateDate": "02/07/2021"
  //       },
  //       {
  //         "stateCode": "EPCS",
  //         "stateName": "En proceso",
  //         "stateDate": "02/07/2021"
  //       },
  //       {
  //         "stateCode": "TRST",
  //         "stateName": "En transito",
  //         "stateDate": "04/07/2021"
  //       }
  //     ],
  //     "deliveryInformation": {
  //       "clientName": "Alberto Ricardo Castillo Riquelme",
  //       "clientDocument": "18.666.345-3",
  //       "deliveryInstructions": "",
  //       "deliveryAddress": "Las Pataguas 3334, Chicureo, Santiago, Región Metropolitana",
  //       "pointOfSale": "E-Commerce",
  //       "authorizedPersons": [
  //         {
  //           "name": "Jose Ricardo Castillo Riquelme",
  //           "documents": [
  //             {
  //               "type": "CC",
  //               "value": "15.636.345-4"
  //             }
  //           ],
  //           "contacts": [
  //             {
  //               "type": "CC",
  //               "value": "4323123"
  //             }
  //           ]
  //         }
  //       ],
  //       "store": {
  //         "code": "STRE0001",
  //         "name": "IKEA Open Kennedy",
  //         "direction": "Avenida Presidente Kennedy 5601 Rosario Norte, Las Condes, Región Metropolitana.",
  //         "hoursOfAttention": "10:00 a 22:00 hrs."
  //       }
  //     },
  //     "packages": [
  //       {
  //         "id": "1",
  //         "updateDatetime": "02/07/2021",
  //         "stateCode": "CFDO",
  //         "stateName": "Confirmado",
  //         "products": [
  //           {
  //             "name": "HÖVÅG",
  //             "detail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "name": "ROSENSKÄRM",
  //             "detail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "name": "SLATTUME",
  //             "detail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "name": "KULLEN",
  //             "detail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           }
  //         ]
  //       },
  //       {
  //         "id": "2",
  //         "updateDatetime": "02/07/2021",
  //         "stateCode": "CFDO",
  //         "stateName": "Confirmado",
  //         "products": [
  //           {
  //             "productName": "SLATTUM",
  //             "productDetail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "productName": "KULLEN",
  //             "productDetail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "productName": "SLATTUM",
  //             "productDetail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "productName": "KULLEN",
  //             "productDetail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           }
  //         ]
  //       },
  //       {
  //         "id": "3",
  //         "updateDatetime": "02/07/2021",
  //         "stateCode": "CFDO",
  //         "stateName": "Confirmado",
  //         "products": [
  //           {
  //             "productName": "SLATTUM",
  //             "productDetail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "productName": "KULLEN",
  //             "productDetail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "productName": "SLATTUM",
  //             "productDetail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           },
  //           {
  //             "productName": "KULLEN",
  //             "productDetail": "Colchón de muelles embolsados, firme/gris oscuro140x200 cm",
  //             "sku": "202.445.11",
  //             "quantity": 5
  //           }
  //         ]
  //       }
  //     ],
  //     "rejectReason": {
  //       "reasonCodeCategory": "string",
  //       "reasonCodeSubCategory": "string",
  //       "additionalDescription": "string",
  //       "mediaURL": ["string"]
  //     }
  //   }

  //   const resultData: IOrderComplete = new OrderCompleteGetAdapterModel(mockData);

  //   const url = `${apiMock}/${environment.API_ENDPOINTS.order_endpoint}/0000433`;

  //   // Act
  //   service.getOrder('0000433')
  //     .subscribe((resData: IOrderComplete) => {
  //       expect(resultData).toEqual(resData);
  //     });
  //   const req: TestRequest = httpTestingController.expectOne(url);

  //   // Assert
  //   expect(req.request.method).toEqual('GET');

  //   req.flush(mockData);
  // });

  // it('#should be return observable matching the data empty - getOrder', () => {
  //   // Arrage
  //   const mockData: ICompleteOrderGetResponseModel = {
  //     data: {
  //       serviceOrderItems: {}
  //     }
  //   } as ICompleteOrderGetResponseModel;
  //   const resultData: ICompleteOrder = new CompleteOrderGetAdapterModel(mockData);

  //   const url = `${apiMock}/${environment.API_SET.api_order}/order/12/0000433`;

  //   // Act
  //   service.getOrder('0000433')
  //     .subscribe((resData: ICompleteOrder) => {
  //       expect(resultData).toEqual(resData);
  //     });
  //   const req: TestRequest = httpTestingController.expectOne(url);

  //   // Assert
  //   expect(req.request.method).toEqual('GET');

  //   req.flush(mockData);
  // });

});
