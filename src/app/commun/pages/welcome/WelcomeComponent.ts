import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

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
  ) { }

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

  registremanager() {
    this._route.navigate(['registremanager']);
  }



}
