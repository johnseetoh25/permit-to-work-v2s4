import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TrackingLogRoutingModule } from './tracking-log-routing.module';
import { TrackingLogComponent } from './components/tracking-log/tracking-log.component';

@NgModule({
  declarations: [
    TrackingLogComponent
  ],
  imports: [
    CommonModule,
    TrackingLogRoutingModule,
    SharedModule
  ]
})
export class TrackingLogModule { }
