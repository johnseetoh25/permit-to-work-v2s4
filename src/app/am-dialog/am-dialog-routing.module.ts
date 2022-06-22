import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmDialogComponent } from './components/am-dialog/am-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: AmDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmDialogRoutingModule { }
