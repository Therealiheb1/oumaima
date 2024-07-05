import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-vote',
  templateUrl: './create-vote.component.html',
  styleUrls: ['./create-vote.component.scss']
})
export class CreateVoteComponent implements OnInit {
  vote: any = {
    voteName: '',
    choices: {}
  };
  choiceName: string = '';
  objectKeys = Object.keys;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  addChoice() {
    if (this.choiceName) {
      this.vote.choices[this.choiceName] = 0;
      this.choiceName = '';
    }
  }

  removeChoice(choice: string) {
    delete this.vote.choices[choice];
  }

  submitVote() {
    const apiUrl = 'http://localhost:8181/vote/create';

    this.http.post<any>(apiUrl, this.vote).subscribe(
      response => {
        console.log('Vote created:', response);
        Swal.fire({
          icon: 'success',
          title: 'Succès!',
          text: 'Vote créé avec succès!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/vote']);
        });
      },
      error => {
        console.error('Error creating vote:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur!',
          text: 'Erreur lors de la création du vote. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  navigateToVotes() {
    this.router.navigate(['/vote']);
  }
}
