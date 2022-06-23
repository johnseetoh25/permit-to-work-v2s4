import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ValidatorReqdetsRoutingModule } from './validator-reqdets-routing.module';
import { ValidatorReqdetsComponent } from './components/validator-reqdets/validator-reqdets.component';
import { SaDialogComponent } from '../sa-dialog/components/sa-dialog/sa-dialog.component';
import { AmDialogComponent } from '../am-dialog/components/am-dialog/am-dialog.component';
import { DbSaDialogComponent } from '../db-sa-dialog/components/db-sa-dialog/db-sa-dialog.component';
import { DbAmDialogComponent } from '../db-am-dialog/components/db-am-dialog/db-am-dialog.component';

@NgModule({
  declarations: [
    ValidatorReqdetsComponent,
    SaDialogComponent,
    AmDialogComponent,
    DbSaDialogComponent,
    DbAmDialogComponent
  ],
  imports: [
    CommonModule,
    ValidatorReqdetsRoutingModule,
    SharedModule
  ]
})
export class ValidatorReqdetsModule { }
