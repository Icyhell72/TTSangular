import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { Subscription } from 'rxjs';
import { Chart, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js/auto';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements AfterViewInit {
  spinner: boolean = false;
  chipsValue: string = '';
  changeDataValue: ReturnedFormationForDev[] = [];
  subscriptionData: Subscription = new Subscription();

  webCount: number = 0;
  mobileCount: number = 0;
  bdCount: number = 0;
  reseauCount: number = 0;
  cloudCount: number = 0;
  iaCount: number = 0;
  devopsCount: number = 0;
  gestionProjetCount: number = 0;

  chart: Chart | null = null; // Store the chart instance

  constructor(
    private serviceFormationDev: FormationForDevService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.chipsValue = '';
    this.changeDataValue = [];
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  loadData() {
    this.subscriptionData = this.serviceFormationDev
      .getFormationForDev()
      .subscribe({
        next: (result) => {
          this.serviceFormationDev.data = result;
          this.changeDataValue = result;
          this.countFormationsByCategory();
          this.updateChart();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  countFormationsByCategory() {
    this.webCount = 0;
    this.mobileCount = 0;
    this.bdCount = 0;
    this.reseauCount = 0;
    this.cloudCount = 0;
    this.iaCount = 0;
    this.devopsCount = 0;
    this.gestionProjetCount = 0;

    this.serviceFormationDev.data.forEach((formation) => {
      switch (formation.categorie) {
        case 'web':
          this.webCount++;
          break;
        case 'mobile':
          this.mobileCount++;
          break;
        case 'bd':
          this.bdCount++;
          break;
        case 'reseau':
          this.reseauCount++;
          break;
        case 'cloud':
          this.cloudCount++;
          break;
        case 'ia':
          this.iaCount++;
          break;
        case 'devops':
          this.devopsCount++;
          break;
        case 'gestion de projets':
          this.gestionProjetCount++;
          break;
        default:
          break;
      }
    });
  }
  
  initializeChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Développement Web',
          'Développement Mobile',
          'Bases de données',
          'Réseaux et Sécurité',
          'Cloud Computing',
          'AI',
          'DevOps',
          'Gestion de Projets',
        ],
        datasets: [
          {
            label: 'Nombre des formations',
            data: [
              this.webCount,
              this.mobileCount,
              this.bdCount,
              this.reseauCount,
              this.cloudCount,
              this.iaCount,
              this.devopsCount,
              this.gestionProjetCount,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = [
        this.webCount,
        this.mobileCount,
        this.bdCount,
        this.reseauCount,
        this.cloudCount,
        this.iaCount,
        this.devopsCount,
        this.gestionProjetCount,
      ];
      this.chart.update(); // Update the chart with new data
    }
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
