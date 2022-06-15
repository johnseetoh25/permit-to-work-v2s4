import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtwRequestComponent } from './components/ptw-request/ptw-request.component';

const routes: Routes = [
  {
    path: '',
    component: PtwRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PtwRequestRoutingModule { }