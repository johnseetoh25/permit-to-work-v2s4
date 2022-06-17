import { NgModule } from '@angular/core';
import { 
  RouterModule, 
  Routes, 
  PreloadAllModules 
} from '@angular/router';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then(module => module.LandingModule)
  },
  {
    path: 'ptw-request',
    loadChildren: () => import('./ptw-request/ptw-request.module').then(module => module.PtwRequestModule)
  },
  {
    path: 'tracking-log',
    loadChildren: () => import('./tracking-log/tracking-log.module').then(module => module.TrackingLogModule)
  },
  {
    path: 'ptw-details',
    loadChildren: () => import('./ptw-details/ptw-details.module').then(module => module.PtwDetailsModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }