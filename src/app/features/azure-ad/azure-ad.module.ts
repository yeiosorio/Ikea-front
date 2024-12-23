import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AzureAdComponent } from './azure-ad.component';
import { AzureAdRoutingModule } from './azure-ad-routing.module';


@NgModule({
  declarations: [
    AzureAdComponent
  ],
  imports: [
    CommonModule,
    AzureAdRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AzureAdModule { }
