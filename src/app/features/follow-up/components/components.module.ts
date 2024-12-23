import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultMatCalendarRangeStrategy, MatDatepickerModule, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { DetailComponent } from './detail/detail.component';
import { CancelledComponent } from './cancelled/cancelled.component';

// https://stackoverflow.com/questions/66167592/how-to-implement-a-date-range-picker-using-mat-calendar-in-angular
export const COMPONENTS = [
  DetailComponent,
  CancelledComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
})
export class ComponentsModule {}
