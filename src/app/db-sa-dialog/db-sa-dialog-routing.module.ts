import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DbSaDialogComponent } from './components/db-sa-dialog/db-sa-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: DbSaDialogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbSaDialogRoutingModule { }
