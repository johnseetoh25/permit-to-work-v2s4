import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatorSignInComponent } from './components/validator-sign-in/validator-sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatorSignInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidatorSignInRoutingModule { }
