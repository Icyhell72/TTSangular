import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formation } from 'src/app/commun/interfaces/formation';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { Subscription } from 'rxjs';
import { FormationForDevService } from '../../services/formation-for-dev.service';

@Component({
  selector: 'app-recommendation-based-on-cv',
  templateUrl: './recommendation-based-on-cv.component.html',
  styleUrls: ['./recommendation-based-on-cv.component.scss']
})
export class RecommendationBasedOnCvComponent {
[x: string]: any;
  recommendations: any = {};
  bestLanguageRecommendations: ReturnedFormationForDev[] = [];
  bestFrameworkRecommendations: ReturnedFormationForDev[] = [];
  worstLanguageRecommendations: ReturnedFormationForDev[] = [];
  worstFrameworkRecommendations: ReturnedFormationForDev[] = [];

  bestLanguageChipValue: string | undefined;
  bestFrameworkChipValue: string | undefined;
  worstLanguageChipValue: string | undefined;
  worstFrameworkChipValue: string | undefined;

  chipsValue: string = '';
  spinner: boolean = false;
  changeDataValue: ReturnedFormationForDev[] = [];
  subscriptionData: Subscription = new Subscription();
  filterType: string = 'Nom';
  

  technologyToChipMap: Map<string, string[]> = new Map([
    ['web', ['JavaScript', 'Angular', 'Spring', 'React', 'Node.js', 'Express', 'Vue.js', 'Ruby on Rails', 'Java', 'Spring Boot','Twig']],
    ['mobile', ['Swift', 'Vapor', 'Flutter', 'Kotlin', 'Android Studio', 'Objective-C', 'Xcode','C++']],
    ['bd', ['MySQL', 'MongoDB', 'Oracle', 'Couchbase', 'PostgreSQL', 'Redis', 'Firebase']],
    ['reseau', ['CentOS', 'Ubuntu', 'Cisco', 'Juniper', 'Wireshark', 'DNS', 'Cloudflare', 'Load Balancing']],
    ['cloud', ['AWS', 'Azure', 'GCP', 'OpenStack', 'Docker', 'Kubernetes']],
    ['devops', ['CI/CD', 'Jenkins', 'GitLab', 'Ansible', 'Terraform', 'Prometheus', 'Grafana', 'Unix', 'Shell Scripting']],
    ['ia', ['Flask', 'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'NLTK', 'SpaCy']],
    ['gestion', ['Star UML', 'Enterprise Architect', 'Agile', 'Scrum', 'Kanban', 'PMI', 'PRINCE2', 'Six Sigma', 'Trello', 'Asana', 'Jira']],
  ]);
  

  technologyCategories: string[] = Object.keys(this.technologyToChipMap);

  constructor(
    private http: HttpClient,
    private serviceFormationDev: FormationForDevService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.chipsValue = '';
    this.changeDataValue = [];
    this.loadData();
    this.fetchRecommendations()
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
          console.log('loading data complete');
        },
      });
  }

  fetchRecommendations(): any {
    const cvText = '...';
  
    this.http.post('http://127.0.0.1:5000/get-recommendations', cvText).subscribe(
      (response: any) => {
        console.log('best language is:', response.best_language);
        console.log('best framework is:', response.best_framework);
        console.log('worst language is:', response.worst_language);
        console.log('worst framework is:', response.worst_framework);
        this.recommendations = response;
  
        this.technologyToChipMap.forEach((chipValue, category) => {
          if (chipValue.includes(this.recommendations.best_language)) {
            this.filterByChip(category, 'bestLanguage');
          }  if (chipValue.includes(this.recommendations.best_framework)) {
            this.filterByChip(category, 'bestFramework');
          }  if (chipValue.includes(this.recommendations.worst_language)) {
            this.filterByChip(category, 'worstLanguage');
          }  if (chipValue.includes(this.recommendations.worst_framework)) {
            this.filterByChip(category, 'worstFramework');
          }
        });
      },
      (error) => {
        console.error('Error fetching recommendations:', error);
      }
    );
  }
  

  filterBy(chipValue: string) {
    this.chipsValue = chipValue;
    this.fetchRecommendations();
  }

  filterByChip(chipValue: string, section: string) {
    this.chipsValue = chipValue;
  
    if (this.chipsValue !== '') {
      this.getCategoryRecommendations(chipValue, section);
    } else {
      this.bestLanguageRecommendations = this.changeDataValue;
      this.bestFrameworkRecommendations = this.changeDataValue;
      this.worstLanguageRecommendations = this.changeDataValue;
      this.worstFrameworkRecommendations = this.changeDataValue;
    }
  }
  
  getCategoryRecommendations(chipValue: string | undefined, section: string) {
    let targetArray: ReturnedFormationForDev[] = [];
  
    if (section === 'bestLanguage') {
      targetArray = this.bestLanguageRecommendations;
    } else if (section === 'bestFramework') {
      targetArray = this.bestFrameworkRecommendations;
    } else if (section === 'worstLanguage') {
      targetArray = this.worstLanguageRecommendations;
    } else if (section === 'worstFramework') {
      targetArray = this.worstFrameworkRecommendations;
    }
  
    targetArray = this.serviceFormationDev.data.filter((e) => {
      return e.categorie === chipValue;
    });
  
    if (section === 'bestLanguage') {
      this.bestLanguageRecommendations = targetArray;
    } else if (section === 'bestFramework') {
      this.bestFrameworkRecommendations = targetArray;
    } else if (section === 'worstLanguage') {
      this.worstLanguageRecommendations = targetArray;
    } else if (section === 'worstFramework') {
      this.worstFrameworkRecommendations = targetArray;
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
