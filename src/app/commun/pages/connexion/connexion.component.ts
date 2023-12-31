import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
})
export class ConnexionComponent {
  affiche: boolean = false;
  toastStatus: boolean = false;
  msg: string = 'Votre compte a été crée avec succès';
  showLogin: boolean = false;
  currentImageIndex: number = 0;
  imageSources: string[] = [ '../../../../assets/images/formation8.jpg',
   '../../../../assets/images/registre.jpg', '../../../../assets/images/elearning.png',
    '../../../../assets/images/formation6.jpg'];

  constructor(
    private _route: Router,
    private _service: AuthentificationService,
    private _snackBar: MatSnackBar
  ) {}

  showLoginSpace() {
    this.showLogin = true;
  }

    getImageSource(index: number): string {
      return this.imageSources[index];
    }

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageSources.length;
    }, 2000);
  }

  connect() {
    this._route.navigate(['connexion']);
  }

  registre() {
    this._route.navigate(['registre']);
  }

  navigatetohome() {
    this._route.navigate(['welcome']);
  }

  
  onLogin(data: NgForm) {
    this._service.login(data.value).subscribe({
      next: (result) => {
        if (result.state) {
          if (result.role == 'manager') {
            sessionStorage.setItem('emailManager', data.value.email);
            this._route.navigate(['manager', 'accueil']);
          } else {
            if (result.equipe) {
              sessionStorage.setItem('emailDev', data.value.email);
              if (result.provider) {
                sessionStorage.setItem('provider', result.provider);
              }
              this._route.navigate(['dev', 'accueil']);
            } else {
              this.msg = "vous n'avez pas encore été affecté à une équipe";
              this._snackBar.open(this.msg, 'fermé', {
                panelClass: ['blue-snackbar'],
                duration: 2000,
              });
            }
          }
        } else {
          this.msg = 'votre email ou mot de passe est incorrect';
          this._snackBar.open(this.msg, 'fermé', {
            panelClass: ['blue-snackbar'],
            duration: 2000,
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    setInterval(() => {
      this.toastStatus = false;
    }, 2500);
  }
  test(login: NgForm) {
    console.log('test');
  }


}
