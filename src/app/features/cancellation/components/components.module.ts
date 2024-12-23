import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultMatCalendarRangeStrategy, MatDatepickerModule, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { SharedModule } from '@shared/shared.module';

// import { FiltersComponent } from './filters/filters.component';
import { DetailComponent } from './detail/detail.component';
import { FiltersComponent } from './filters/filters.component';

// https://stackoverflow.com/questions/66167592/how-to-implement-a-date-range-picker-using-mat-calendar-in-angular
export const COMPONENTS = [
  DetailComponent,
  FiltersComponent
];

const MODULES = [
  CommonModule,
  FormsModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  ReactiveFormsModule,
  SharedModule
];

@NgModule({
  declarations: [...COMPONENTS ],
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
