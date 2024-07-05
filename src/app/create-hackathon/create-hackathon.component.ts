import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-hackathon',
  templateUrl: './create-hackathon.component.html',
  styleUrls: ['./create-hackathon.component.scss']
})
export class CreateHackathonComponent implements OnInit {
  hackathon: any = {
    hackName: '',
    local: '',
    time: '',
    description: '',
    prix: 0,
    image: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submitHackathon() {
    const apiUrl = 'http://localhost:8181/hackathon/create';

    this.http.post<any>(apiUrl, this.hackathon).subscribe(
      response => {
        console.log('Event created:', response);

        Swal.fire({
          icon: 'success',
          title: 'Hackathon créé avec succès!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        console.error('Error creating event:', error);
    
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la création de l\'hackathon',
          text: 'Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  navigateToHackathon() {
    this.router.navigate(['/hackathon']); 
  }

  handleImageInput(event: any) {
    const file = event.target.files[0];
    this.hackathon.image = file;
  }
}
