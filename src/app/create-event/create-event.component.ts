import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  event: any = {
    eventName: '',
    local: '',
    time: '',
    description: '',
    prix: 0,
    image: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submitEvent() {
    const apiUrl = 'http://localhost:8181/event/create';

    this.http.post<any>(apiUrl, this.event).subscribe(
      response => {
        console.log('Event created:', response);

        Swal.fire({
          icon: 'success',
          title: 'Événement créé avec succès!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        console.error('Error creating event:', error);
    
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la création de l\'événement',
          text: 'Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  navigateToEvent() {
    this.router.navigate(['/event']); 
  }
}
