import {
  CardModule,
  GridModule,
  TableModule,
  UtilitiesModule
} from '@coreui/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseComponent } from './license.component';
import { LicenseRoutingModule } from './license-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    GridModule,
    TableModule,
    UtilitiesModule,
    LicenseRoutingModule
  ],
  declarations: [
    LicenseComponent
  ]
})
export class LicenseModule { }
