import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/****** Core Module ******/
import { CoreModule } from '@core/core.module';
/****** Shared Module ******/
import { SharedModule } from '@shared/shared.module';

import { ReportsRoutingModule } from './reports-routing.module';

import { ReportHomeComponent } from './views/report-home/report-home.component';
import { AccessComponent } from './views/access/access.component';
import { ReportsComponent } from './reports.component';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  CoreModule,
  SharedModule,
  ReportsRoutingModule
];
const COMPONENTS = [
  ReportsComponent,
  AccessComponent,
  ReportHomeComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
  // providers: [...PROVIDERS, ...INTERCEPTORS],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReportsModule { }
