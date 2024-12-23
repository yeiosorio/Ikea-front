import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

// Components Skapa
import { SkToastComponent } from './components/skapa/sk-toast/sk-toast.component';
import { SkModalPromptComponent } from './components/skapa/sk-modal-prompt/sk-modal-prompt.component';
import { SkModalReturnCancelComponent } from './components/skapa/sk-modal-return-cancel/sk-modal-return-cancel.component';
import { SkModalSheetsComponent } from './components/skapa/sk-modal-sheets/sk-modal-sheets.component';
import { SkMainMenuComponent } from './components/skapa/sk-main-menu/sk-main-menu.component';
import { DeliveryStepperComponent } from './components/delivery-stepper/delivery-stepper.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { DeliveryInfoComponent } from './components/delivery-info/delivery-info.component';
import { SkInlineMessageComponent } from './components/skapa/sk-inline-message/sk-inline-message.component';

// Services
import { InactivityService } from '@shared/services/utils/inactivity/inactivity.service';
import { LocalStorageService } from '@shared/services/utils/local-storage/local-storage.service';
import { SessionStorageService } from '@shared/services/utils/session-storage/session-storage.service';
import { LoadingService } from './services/utils/loading/loading.service';
import { OrderService } from '@shared/services/order/order.service';
import { ReturnService } from '@shared/services/return/return.service';
import { OrderHttp } from '@shared/services/http/order.http';
import { ReturnHttp } from '@shared/services/http/return.http';
import { LoginService } from '@shared/services/login/login.service';
import { FiltersService } from '@shared/services/filters/filters.service';

// Modules
import { HttpModule } from './services/http/http.module';

// Components
import { MessageComponent } from './components/message/message.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SessionInactivityComponent } from './components/session-inactivity/session-inactivity.component';

const MODULES = [
  CommonModule,
  HttpModule,
  RouterModule
];

const COMPONENTS = [
  SkToastComponent,
  SkModalPromptComponent,
  SkModalReturnCancelComponent,
  SkModalSheetsComponent,
  SkMainMenuComponent,
  DeliveryStepperComponent,
  StepperComponent,
  DeliveryInfoComponent,
  MessageComponent,
  LoadingComponent,
  SessionInactivityComponent,
  SkInlineMessageComponent
];

const PIPES = [];

const INTERCEPTORS = [
  // { provide: HTTP_INTERCEPTORS, useClass: TokenYapmInterceptorInterceptor, multi: true },
];

const SERVICES = [
  InactivityService,
  LocalStorageService,
  SessionStorageService,
  OrderService,
  OrderHttp,
  ReturnService,
  LoadingService,
  ReturnHttp,
  LoginService,
  FiltersService,
];

@NgModule({
  declarations: [...COMPONENTS], // [...PIPES],
  imports: [...MODULES],
  providers: [...SERVICES], // [...SERVICES, ...INTERCEPTORS],
  exports: [...COMPONENTS, ...MODULES], // [...PIPES, ...MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
