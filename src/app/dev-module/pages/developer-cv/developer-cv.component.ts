import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-developer-cv',
  templateUrl: './developer-cv.component.html',
  styleUrls: ['./developer-cv.component.scss']
})
export class DeveloperCvComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private router: Router) { }


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadCV() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('cv', this.selectedFile);
  
      this.http.post<any>('http://127.0.0.1:5000/process-cv', formData).subscribe(
        (response) => {
          console.log('CV Uploaded:', response);
          // Navigate to the RecommendationBasedOnCvComponent
          this.router.navigate(['/dev/mes-formation/rec']);
        },
        (error) => {
          console.error('CV Upload Error:', error);
          // Handle error here
        }
      );
    }
  }
  
}
