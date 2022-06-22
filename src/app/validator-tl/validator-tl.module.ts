import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ValidatorTlRoutingModule } from './validator-tl-routing.module';
import { ValidatorTlComponent } from './components/validator-tl/validator-tl.component';

@NgModule({
  declarations: [
    ValidatorTlComponent
  ],
  imports: [
    CommonModule,
    ValidatorTlRoutingModule,
    SharedModule
  ]
})
export class ValidatorTlModule { }
