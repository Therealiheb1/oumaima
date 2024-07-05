import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-formation-popup',
  templateUrl: './create-formation-popup.component.html',
  styleUrls: ['./create-formation-popup.component.scss']
})
export class CreateFormationPopupComponent {
  formation: any = {};
  apiUrl = 'http://localhost:8181/formation';

  constructor(private http: HttpClient,private router: Router) {}

  submitForm() {
    this.http.post<any>(`${this.apiUrl}/create`, this.formation)
      .subscribe(
        response => {
          console.log('Formation created:', response);
         
          Swal.fire({
            icon: 'success',
            title: 'Formation créée!',
            text: 'La formation a été ajoutée avec succès.',
            confirmButtonText: 'OK'
          });
          
        },
        error => {
          console.error('Error creating formation:', error);
          
          Swal.fire({
            icon: 'error',
            title: 'Erreur!',
            text: 'Une erreur est survenue lors de la création de la formation.',
            confirmButtonText: 'OK'
          });
         
        }
      );
  }
  navigateToFormation() {
    this.router.navigate(['/formation']); 
  }
}
