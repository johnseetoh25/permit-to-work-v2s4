import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PtwDetailsRoutingModule } from './ptw-details-routing.module';
import { PtwDetailsComponent } from './components/ptw-details/ptw-details.component';
import { ReqcancDialogComponent } from '../reqcanc-dialog/components/reqcanc-dialog/reqcanc-dialog.component';
import { ReqtermDialogComponent } from '../reqterm-dialog/components/reqterm-dialog/reqterm-dialog.component';

@NgModule({
  declarations: [
    PtwDetailsComponent,
    ReqcancDialogComponent,
    ReqtermDialogComponent
  ],
  imports: [
    CommonModule,
    PtwDetailsRoutingModule,
    SharedModule
  ]
})
export class PtwDetailsModule { }
