import { Component, OnInit, Renderer2 } from '@angular/core';
import { Formation } from '../../../commun/interfaces/formation';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilDevComponent implements OnInit {
  spinner: boolean = false;
  chipsValue: string = '';
  changeDataValue: ReturnedFormationForDev[] = [];
  subscriptionData: Subscription = new Subscription();
  searchText: string = '';
  filterType: string = 'Nom';

  constructor(
    private serviceFormationDev: FormationForDevService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.chipsValue = '';
    this.changeDataValue = [];
    this.loadData();
  }

  loadData() {
    this.subscriptionData = this.serviceFormationDev
      .getFormationForDev()
      .subscribe({
        next: (result) => {
          this.serviceFormationDev.data = result;
          this.changeDataValue = result;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  handleChipSelection(chipValue: string) {
    const chipOptions = document.querySelectorAll('.mat-chip-option');
    chipOptions.forEach((chip) => {
      this.renderer.removeClass(chip, 'selected');
    });

    const selectedChip = document.querySelector(
      `.mat-chip-option[value="${chipValue}"]`
    );
    this.renderer.addClass(selectedChip, 'selected');

    this.chipsValue = chipValue;
    this.filterBy();
  }

  filterBy() {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      if (this.chipsValue !== '') {
        if (this.searchText === '') {
          this.changeDataValue = this.serviceFormationDev.data.filter(
            (formation: ReturnedFormationForDev) => {
              return formation.categorie === this.chipsValue;
            }
          );
        }
      }
    }, 1000);
  }

  searchBy(filter: string, value: string) {
    this.spinner = true;
    this.chipsValue = '';
    setTimeout(() => {
      this.spinner = false;
      if (value === '') {
        this.changeDataValue = this.serviceFormationDev.data;
      } else {
        this.changeDataValue = this.serviceFormationDev.data.filter(
          (formation: ReturnedFormationForDev) => {
            if (filter === 'Nom') {
              return (
                formation.nomFormation
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) >= 0
              );
            } else if (filter === 'Entite Formatirce') {
              return (
                formation.entiteFormatrice
                  .toLowerCase()
                  .indexOf(value.toLowerCase()) >= 0
              );
            }
            return (
              formation.description
                .toLowerCase()
                .indexOf(value.toLowerCase()) >= 0
            );
          }
        );
      }
    }, 1000);
  }

  reloadContent(event: boolean) {
    this.serviceFormationDev.ngOnInit();
    this.changeDataValue = this.serviceFormationDev.data;
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscriptionData.unsubscribe();
  }

  deconnexion(){
    sessionStorage.clear()
  }
}
