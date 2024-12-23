import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReturnService } from '@shared/services/return/return.service';
import { ControlsService } from '@shared/services/utils/controls/controls.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { IListStoresComplete } from '@shared/models/listStores.model';
import { IAvailabilityResponse, IGeographic, IReservationCreateRequest, LogisticOption } from '@shared/models/return.model';

@Component({
  selector: 'app-step3-no-fo',
  templateUrl: './step3-no-fo.component.html',
  styleUrls: ['./step3-no-fo.component.scss']
})
export class Step3NoFoComponent implements OnInit {
  visibleModal: boolean = false;
  resumenAddressInfo!: {
    customerAddress: string | undefined
    customerDepto: string | undefined
    customerNumber: string | undefined
    regionName: string | undefined
    cityName: string | undefined
    region: string | undefined
    city: string | undefined
    geolocation: {
      latitude: string;
      longitude: string;
    } | undefined
  };

  loadingStores: boolean = false;

  regions!: IGeographic;
  cities!: IGeographic;
  citiesDropOff!: IGeographic;

  stepId: string = 'step3Address'
  optionHome: boolean = true;
  optionDropoff: boolean = false;
  availableStores: boolean = false;
  visible: boolean = false;
  setDatePickup: string = '';
  hour: boolean = false;
  showResumenAddress: boolean = false;
  showHomeAddress: boolean = false;
  savedLocalInfo: boolean = false;
  homePickupForm!: FormGroup;
  storeDropOff_form!: FormGroup;
  hoursForm!: FormGroup;

  selectedDate!: Date | null;
  startDate = moment().toDate();
  maxDate = moment().add(15, "days").toDate();

  politicalId = `${environment.politicalIdCL}`;
  storesNode: IListStoresComplete[] = [];
  storeDetail!: IListStoresComplete;
  availabilityOptions = {} as IAvailabilityResponse;
  logisticFound: LogisticOption[] = [];
  localDataExist: boolean = false;
  storeIndex: number = 0;
  daysOfWeek: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  btnFullDate: string = '';
  showChoosedDate: string = '';
  nodesInfo: boolean = false;
  logisticOptionId: string = '';
  logisticGroupId: string = '';
  promiseId: string = '';
  expiration: string = '';
  reservationId: string = '';
  loadingCalendar: boolean = false;

  constructor(
    public router: Router,
    public returnService: ReturnService,
    public controlsService: ControlsService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.availabilityOptions.productGroups = [];
    this.formGenerator();
    this.getLocations(this.politicalId).then(
      value => {
        this.regions = value
      }
    );
    this.retrieveData(this.stepId);
  }


  formGenerator(): void {
    this.homePickupForm = this.formBuilder.group({
      region: ['', [
        Validators.required,
      ]],
      city: ['', [
        Validators.required,
      ]],
      customerAddress: ['', [
        Validators.required,
      ]],
      customerNumber: ['', [
        Validators.required,
      ]],
      customerDepto: ['', [
      ]]
    });

    this.storeDropOff_form = this.formBuilder.group({
      region: ['', [
        Validators.required,
      ]],
      city: ['', [
        Validators.required,
      ]],
      store: ['', [
        Validators.required,
      ]],

    });

    this.hoursForm = this.formBuilder.group({
      hours: [false, []]
    });
  }

  getListStores(politicalId: string) {
    this.loadingStores = true;
    this.storesNode = [];
    this.storeDropOff_form.get('store')?.setValue('');
    this.nodesInfo = false;
    this.returnService.getListStores(politicalId).then(
      value => {
        this.loadingStores = false;
        this.storesNode = value;
        if (this.localDataExist) {
          this.setStoreInfo(this.storeIndex)
        }
      }, onrejected => {
        this.loadingStores = false;
        console.warn('reason');
        console.warn(onrejected);
      });
  }

  getLocations(politicalId?: string, comuna?: string): Promise<IGeographic> {
    return new Promise((resolve, reject) => {
      this.returnService.getLocations(politicalId, comuna).then(
        value => {
          resolve(value);
        }, onrejected => {
          console.warn('reason');
          console.warn(onrejected);
        });
    })
  }

  switchView() {
    this.optionDropoff = true;
    this.optionHome = false;
  }

  setStoreInfo(storeIndex: number) {
    this.storeDetail = this.storesNode[storeIndex]
    this.nodesInfo = true;
  }

  getCitiesDropOff(politicalId?: string) {
    this.storesNode = [];
    this.storeDropOff_form.get('city')?.setValue('');
    this.storeDropOff_form.get('store')?.setValue('');
    this.nodesInfo = false;
    this.getLocations(politicalId, 'comuna').then(
      value => {
        this.citiesDropOff = value
      }
    );
  }

  getCities(politicalId?: string) {
    this.getLocations(politicalId, 'comuna').then(
      value => {
        this.cities = value;
      }
    );
  }

  getNamesLocations(location: string, code: string | undefined) {
    let dataName: string | undefined = ''
    if (location === 'region') {
      dataName = this.regions?.geographicReferences?.find(value => value.politicalAreaId == code)?.name;
    }
    if (location === 'city') {
      dataName = this.cities?.geographicReferences?.find(value => value.politicalAreaId == code)?.name;
    }
    if (location === 'cityDropOff') {
      dataName = this.citiesDropOff?.geographicReferences?.find(value => value.politicalAreaId == code)?.name;
    }
    return dataName;
  }

  preSaveAddress() {
    if (this.optionHome) {
      this.saveAddressHomePickup();
    } else {
      this.saveAddressDropOff();
    }
  }

  saveAddressHomePickup() {
    this.returnService.setLocalData('optionTab', { optionHome: true });

    this.resumenAddressInfo = {
      customerAddress: this.homePickupForm.get('customerAddress')?.value,
      customerDepto: this.homePickupForm.get('customerDepto')?.value,
      customerNumber: this.homePickupForm.get('customerNumber')?.value,
      regionName: this.getNamesLocations('region', this.homePickupForm.get('region')?.value),
      cityName: this.getNamesLocations('city', this.homePickupForm.get('city')?.value),
      region: this.homePickupForm.get('region')?.value,
      city: this.homePickupForm.get('city')?.value,
      geolocation: {
        latitude: "0",
        longitude: "0"
      }
    }

    let geolocations = this.citiesDropOff.geographicReferences.find(value =>
      value.politicalAreaId == this.storeDropOff_form.get('city')?.value
    )?.geoCenter

    if (geolocations) {
      this.resumenAddressInfo.geolocation = geolocations
    }
    this.returnService.setLocalData('step3Address', this.resumenAddressInfo);
    this.showResumenAddress = true;
    this.savedLocalInfo = true;
  }

  saveAddressDropOff() {
    this.returnService.removeLocalData('availabilityDate');
    this.returnService.setLocalData('optionTab', { optionHome: false });
    let resumenAddressInfo = {
      regionCode: this.storeDropOff_form.get('region')?.value,
      cityCode: this.storeDropOff_form.get('city')?.value,
      storeCode: this.storeDropOff_form.get('store')?.value,
      regionName: this.getNamesLocations('region', this.storeDropOff_form.get('region')?.value),
      cityName: this.getNamesLocations('cityDropOff', this.storeDropOff_form.get('city')?.value),
      storeName: this.storeDetail.address.addressLine1,
      geolocation: {
        latitude: "0",
        longitude: "0"
      }
    }

    let geolocations = this.citiesDropOff.geographicReferences.find(value =>
      value.politicalAreaId == this.storeDropOff_form.get('city')?.value
    )?.geoCenter

    if (geolocations) {
      resumenAddressInfo.geolocation = geolocations
    }

    this.returnService.setLocalData('step3Address', resumenAddressInfo);
    this.savedLocalInfo = true;
    this.nextStep();

  }

  retrieveData(stepId: string) {
    const hasStep2 = this.returnService.getLocalData('step2');

    if (hasStep2) {
      const optionTab = this.returnService.getLocalData('optionTab');
      const data = this.returnService.getLocalData(stepId);
      if (optionTab) {
        if (optionTab.optionHome) {
          const availabilityDate = this.returnService.getLocalData('availabilityDate');
          this.optionHome = true;
          this.optionDropoff = false;
          this.resumenAddressInfo = data;
          this.showResumenAddress = true;
          this.savedLocalInfo = true;
          this.setDatePickup = availabilityDate?.labelDate;
        } else {
          this.optionHome = false;
          this.optionDropoff = true;
          this.localDataExist = true;
          this.setFormDataDropOff(data);
        }
      }
    } else {
      this.exitHome();
    }

  }

  modifiedForm() {
    this.homePickupForm.get('city')?.setValue('');
    this.savedLocalInfo = false;
    this.showResumenAddress = false;
    this.showHomeAddress = true;
    this.getLocations(this.resumenAddressInfo.region, 'comuna').then(
      value => {
        this.cities = value;
        this.setFormDataHome();
      }
    );
  }

  setFormDataHome() {
    let formInfo = {
      region: this.resumenAddressInfo.region,
      city: this.resumenAddressInfo.city,
      customerAddress: this.resumenAddressInfo.customerAddress,
      customerDepto: this.resumenAddressInfo.customerDepto,
      customerNumber: this.resumenAddressInfo.customerNumber
    }
    setTimeout(() => {
      this.homePickupForm.patchValue(formInfo);
    }, 50);
  }

  setFormDataDropOff(localData: any) {
    this.storeIndex = localData.storeCode;
    this.getCitiesDropOff(localData.regionCode);
    this.getListStores(localData.cityCode);
    let formInfo = {
      region: localData.regionCode,
      city: localData.cityCode,
      store: localData.storeCode
    }
    this.storeDropOff_form.patchValue(formInfo)
  }

  myFilter = (d: Date | null): boolean => {
    let hasAvailability = false;
    const fulldate = (d || new Date());
    const date = `${fulldate.getFullYear()}-${fulldate.getMonth() + 1}-${fulldate.getDate()}`;

    this.availabilityOptions?.productGroups?.map((productGroup) => {
      productGroup?.logisticOptions?.map((logistic) => {
        let availabilityDateFrom = moment(logistic.dateFrom).add(1, "days");
        let dateFrom = moment(availabilityDateFrom).format('YYYY-MM-DD');

        let availabilityDateTo = moment(logistic.dateTo).add(1, "days");
        let dateTo = moment(availabilityDateTo).format('YYYY-MM-DD');

        if (moment(date).isBetween(dateFrom, dateTo, 'days', '[]')) {
          hasAvailability = true;
          return;
        }
      });
    });
    return hasAvailability;
  };

  openSchedulePickup() {
    this.loadingCalendar = true;
    this.controlsService.setOpenDetail(true);
    this.availabilityOptions.productGroups = [];
    this.hoursForm.get('hours')?.setValue(false);
    this.logisticFound = [];
    this.showChoosedDate = '';

    const startFrom = moment().subtract(5, "h").toISOString().split('.')[0] + 'Z';
    console.warn('ISO time');
    console.log(startFrom);
    const step2 = this.returnService.getLocalData('step2');

    let reverseObj = {
      geolocation: {
        politicalArea: {
          id: this.resumenAddressInfo.city
        }
      },
      productGroups: [{
        startFrom: startFrom,
        daysCount: 15,
        products: [{
          item: {
            sellerId: "IKEA_CHILE",
            // sellerSkuId: step2.sku
            sellerSkuId: "70330813"
          },
          condition: "NEW",
          quantity: 1,
          itemId: "70330813",
          // itemId: step2.sku,
          orderId: ""
        }],
        services: [{
          deliveryType: "REVERSE"
        }]
      }]
    }

    this.returnService.getAvailability(reverseObj).then(
      value => {
        this.loadingCalendar = false;
        if (value.productGroups) {
          this.availabilityOptions = value;
          this.logisticGroupId = this.availabilityOptions.productGroups[0].logisticGroupId;
          this.promiseId = this.availabilityOptions.promiseId;
          this.expiration = this.availabilityOptions.expiration;
        }
      }, onrejected => {
        this.loadingCalendar = false;
        console.warn('reason');
        console.warn(onrejected);
      }
    );
  }

  onSelectedDate(d: Date | null): void {
    this.logisticFound = [];
    this.hoursForm.get('hours')?.setValue(false)

    const fulldate = (d || new Date())
    const date =
      `${moment(fulldate).format('YYYY')}-${moment(fulldate).format('MM')}-${moment(fulldate).format('DD')}`
    this.btnFullDate =
      `${this.daysOfWeek[fulldate.getDay()]}, ${moment(fulldate).format('DD')}/${moment(fulldate).format('MM')}/${moment(fulldate).format('YYYY')}`

    for (const productGroup of this.availabilityOptions?.productGroups) {
      this.logisticFound = productGroup?.logisticOptions.filter((logistic) => {
        let availabilityDateFrom = moment(logistic.dateFrom).add(1, "days");
        let dateFrom = moment(availabilityDateFrom).format('YYYY-MM-DD');

        let availabilityDateTo = moment(logistic.dateTo).add(1, "days");
        let dateTo = moment(availabilityDateTo).format('YYYY-MM-DD');

        return moment(date).isBetween(dateFrom, dateTo, 'days', '[]');
      });

      if (this.logisticFound.length > 0)
        break;
    };
  }

  setRadioBtnDate(hourStart: string, hourEnd: string, logisticOptionId: string) {
    this.logisticOptionId = logisticOptionId;
    this.returnService.setScrollCalendar();
    this.showChoosedDate = `${this.btnFullDate} - ${hourStart} a ${hourEnd}`;
  }

  onSetDatePickup() {
    const expirationTime = moment().add(6, "h").toISOString();
    const reservation = {
      expirationTime: this.expiration,
      promises: [{
        promiseId: this.promiseId,
        logisticGroups: [{
          logisticGroupId: this.logisticGroupId,
          logisticOptionId: this.logisticOptionId
        }]
      }]
    } as IReservationCreateRequest;

    this.returnService.reservationCreate(reservation).then(
      value => {
        if (value) {
          this.reservationId = value.reservationId
          this.setDatePickup = this.showChoosedDate;
          this.visible = false;
        }
      }, onrejected => {
        console.warn('reason');
        console.warn(onrejected);
      }
    );

  }

  nextStep() {

    if (this.reservationId) {
      if (this.optionHome) {
        const availabilityDate = {
          labelDate: this.setDatePickup,
          fullDate: this.setDatePickup,
          reservationId: this.reservationId,
          logisticGroupId: this.logisticGroupId,
          logisticOptionId: this.logisticOptionId,
        }
        this.returnService.setLocalData('availabilityDate', availabilityDate);
      }
      this.returnService.reservationConfirm(this.reservationId).then(
        value => {
          if (value.status === 'CONFIRMED') {
            this.returnService.setNextStep('step4-no-fo');
            this.router.navigate([`/returns/step4-no-fo`]);
          }
        }, onrejected => {
          console.warn('reason');
          console.warn(onrejected);
        }
      );
    } else {
      this.returnService.setNextStep('step4-no-fo');
      this.router.navigate([`/returns/step4-no-fo`]);
    }
  }

  backStep(): void {
    this.returnService.setNextStep('step2-no-fo');
    this.router.navigate([`/returns/step2-no-fo`]);
  }

  closeDetail() {
    this.controlsService.setOpenDetail(false);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  exitHome() {
    this.router.navigate([`/home`]);
  }

}
