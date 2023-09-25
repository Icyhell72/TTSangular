import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { WelcomeComponent } from './pages/welcome/WelcomeComponent';
import { RegistreManagerComponent } from './pages/registre-manager/registre-manager.component';

@NgModule({
  declarations: [

  
    WelcomeComponent,
        
  ],
  imports: [CommonModule ],
})
export class CommunModule {}
