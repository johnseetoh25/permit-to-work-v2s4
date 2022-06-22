import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidatorReqdetsComponent } from './components/validator-reqdets/validator-reqdets.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatorReqdetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidatorReqdetsRoutingModule { }
