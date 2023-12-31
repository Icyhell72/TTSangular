import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathInvalidComponent } from './commun/pages/path-invalid/path-invalid.component';
import { ConnexionComponent } from './commun/pages/connexion/connexion.component';
import { ResgitreComponent } from './commun/pages/resgitre/resgitre.component';
import { authentificationManagerGuard } from './manager-module/guards/authentificationManager.guard';
import { loginSignUpGuard } from './commun/gards/login-sign-up.guard';
import { devGuard } from './dev-module/gards/dev.guard';
import { WelcomeComponent } from './commun/pages/welcome/WelcomeComponent';
import { RegistreManagerComponent } from './commun/pages/registre-manager/registre-manager.component';

const routes: Routes = [
  {
    path:"",redirectTo:"welcome",pathMatch:'full'
  },

  {
    path: 'welcome',
    component:WelcomeComponent,
  },

  {
    path: 'registremanager',
    component:RegistreManagerComponent,
  },

  
  {
    path: 'connexion',
    component: ConnexionComponent,
    canActivate:[loginSignUpGuard]
  },
  {
    path: 'registre',
    component: ResgitreComponent,
    canActivate:[loginSignUpGuard]

  },
  {

    path: 'manager',
    canActivate:[authentificationManagerGuard],
    loadChildren: () =>
      import('./manager-module/manager-module.module').then(
        (m) => m.ManagerModule
      ),
  },
  {
    path: 'dev',
    canActivate: [devGuard],
    loadChildren: () =>
      import('./dev-module/dev-module.module').then((m) => m.DevModule),
  
  },
  {
    path: '**',
    component: PathInvalidComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
