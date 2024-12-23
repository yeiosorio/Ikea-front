import { CommonModule } from '@angular/common';
import {
  NgModule,
  // CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DefaultMatCalendarRangeStrategy, MatDatepickerModule, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';

import { ReasonsReturnComponent } from './reasons-return/reasons-return.component';
import { CreateReasonsReturnComponent } from './create-reasons-return/create-reasons-return.component';

// https://stackoverflow.com/questions/66167592/how-to-implement-a-date-range-picker-using-mat-calendar-in-angular
export const COMPONENTS = [
  ReasonsReturnComponent,
  CreateReasonsReturnComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  // MatDatepickerModule,
  // MatInputModule,
  // MatNativeDateModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // providers: [
  //   {
  //     provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
  //     useClass: DefaultMatCalendarRangeStrategy,
  //   },
  // ],
})
export class ComponentsModule {}
