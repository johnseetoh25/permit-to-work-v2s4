import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtwDetailsComponent } from './components/ptw-details/ptw-details.component';

const routes: Routes = [
  {
    path: '',
    component: PtwDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PtwDetailsRoutingModule { }
