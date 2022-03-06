import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivoService} from './services/activo.service';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { SignupComponent} from './signup/signup.component';
import { LoginComponent} from './login/login.component';
import { CreateTareaComponent} from './create-tarea/create-tarea.component';
import { DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren:()=> import('./custom-layout/custom-layout.module')
    .then(m=>m.CustomLayoutModule),
    canActivate:[ActivoService]
  },
  {
    path:'signup',
    component:SignupComponent,
    canActivate:[ActivoService]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'dashboard',
    component: CustomLayoutComponent,
    canActivate:[ActivoService]
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
