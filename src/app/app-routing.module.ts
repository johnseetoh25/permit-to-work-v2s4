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
    path: 'validator-reqdets',
    loadChildren: () => import('./validator-reqdets/validator-reqdets.module').then(module => module.ValidatorReqdetsModule)
  },
  {
    path: 'validator-sign-in',
    loadChildren: () => import('./validator-sign-in/validator-sign-in.module').then(module => module.ValidatorSignInModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule)
  },
  {
    path: 'validator-tl',
    loadChildren: () => import('./validator-tl/validator-tl.module').then(module => module.ValidatorTlModule)
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