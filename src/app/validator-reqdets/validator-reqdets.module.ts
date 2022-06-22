import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ValidatorReqdetsRoutingModule } from './validator-reqdets-routing.module';
import { ValidatorReqdetsComponent } from './components/validator-reqdets/validator-reqdets.component';
import { SaDialogComponent } from '../sa-dialog/components/sa-dialog/sa-dialog.component';
import { AmDialogComponent } from '../am-dialog/components/am-dialog/am-dialog.component';

@NgModule({
  declarations: [
    ValidatorReqdetsComponent,
    SaDialogComponent,
    AmDialogComponent
  ],
  imports: [
    CommonModule,
    ValidatorReqdetsRoutingModule,
    SharedModule
  ]
})
export class ValidatorReqdetsModule { }
