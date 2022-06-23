import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DbAmDialogComponent } from './components/db-am-dialog/db-am-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: DbAmDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbAmDialogRoutingModule { }
