import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PtwDetailsRoutingModule } from './ptw-details-routing.module';
import { PtwDetailsComponent } from './components/ptw-details/ptw-details.component';

@NgModule({
  declarations: [
    PtwDetailsComponent
  ],
  imports: [
    CommonModule,
    PtwDetailsRoutingModule,
    SharedModule
  ]
})
export class PtwDetailsModule { }
