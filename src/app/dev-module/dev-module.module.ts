import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { AccueilDevComponent } from './pages/accueil/accueil.component';
import { RouterModule, Routes } from '@angular/router';
import { CrousselComponent } from './components/croussel/croussel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PathInvalidComponent } from '../commun/pages/path-invalid/path-invalid.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DetailsComponent } from './pages/details/details.component';
import { AssigneComponent } from './pages/assigne/assigne.component';
import { EnCoursComponent } from './pages/en-cours/en-cours.component';
import { TermineComponent } from './pages/termine/termine.component';
import { FavorisComponent } from './pages/favoris/favoris.component';
import { ParametreComponent } from './pages/parametre/parametre.component';
import { PreinscriptionComponent } from './components/preinscription/preinscription.component';
import { ConfirmeComponent } from './components/confirme/confirme.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CertifComponent } from './pages/certif/certif.component';
import { DeveloperCvComponent } from './pages/developer-cv/developer-cv.component';
import { RecommendationBasedOnCvComponent } from './pages/recommendation-based-on-cv/recommendation-based-on-cv.component';
import { StatistiquesComponent } from './pages/statistiques/statistiques.component';

const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilDevComponent,
  },
  // {
  //   path: 'profil',
  //   component: ProfilComponent,
  // },
  {
    path: 'parametre',
    component: ParametreComponent,
  },
  {
    path:'mes-formation',children: [
      {
        path:'assigne',component:AssigneComponent
      },
      {
        path:'favoris',component:FavorisComponent
      },
      {
        path:'en-cours',component:EnCoursComponent
      },
      {
        path:'termine',component:TermineComponent
      },
      {
        path:'certif',component:CertifComponent
      },
      {
        path:'uploadcv',component:DeveloperCvComponent
      },
      {
        path:'rec',component:RecommendationBasedOnCvComponent
      },
      {
        path:'stat',component:StatistiquesComponent
      },
      {
        path:'**',component:PathInvalidComponent
      },
    ]
  },
  {
    path: ':id',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: PathInvalidComponent,
  },
  
];

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    AccueilDevComponent,
    SpinnerComponent,
    CrousselComponent,
    SidebarComponent,
    DetailsComponent,
    AssigneComponent,
    EnCoursComponent,
    TermineComponent,
    FavorisComponent,
    ParametreComponent,
    PreinscriptionComponent,
    ConfirmeComponent,
    CertifComponent,
    DeveloperCvComponent,
    RecommendationBasedOnCvComponent,
    StatistiquesComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes),HttpClientModule,MatProgressBarModule,
    MatChipsModule,
    MatButtonModule,MatMenuModule
  ],
  exports: [RouterModule, HeaderComponent, AccueilDevComponent],
})
export class DevModule {}
