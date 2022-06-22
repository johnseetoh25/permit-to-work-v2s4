import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatorTlComponent } from './components/validator-tl/validator-tl.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatorTlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidatorTlRoutingModule { }
