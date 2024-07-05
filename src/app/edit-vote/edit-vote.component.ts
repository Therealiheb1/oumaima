import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vote',
  templateUrl: './edit-vote.component.html',
  styleUrls: ['./edit-vote.component.scss']
})
export class EditVoteComponent implements OnInit {
  voteForm: FormGroup;
  voteId: number;
  vote: any; // You can define more detailed types/interfaces for your data

  // Flag to track if form data has changed
  formChanged: boolean = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.voteId = this.route.snapshot.params['id'];
    this.initForm();
    this.fetchVoteById();
  }

  initForm() {
    this.voteForm = this.formBuilder.group({
      voteName: ['', Validators.required],
      choices: this.formBuilder.group({})
    });

    // Subscribe to form value changes to track modifications
    this.voteForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  fetchVoteById() {
    const apiUrl = `http://localhost:8181/vote/getbyid/${this.voteId}`;

    this.http.get<any>(apiUrl).subscribe(
      data => {
        this.vote = data;
        this.populateForm();
      },
      error => {
        console.error('Error fetching vote:', error);
        // Handle error accordingly
      }
    );
  }

  populateForm() {
    if (this.vote) {
      this.voteForm.patchValue({
        voteName: this.vote.voteName
      });

      // Populate choices dynamically
      const choicesGroup = {};
      Object.keys(this.vote.choices).forEach(choice => {
        choicesGroup[choice] = [{ value: this.vote.choices[choice], disabled: true }, Validators.required];
      });
      this.voteForm.setControl('choices', this.formBuilder.group(choicesGroup));
    }
  }

  submitVote() {
    const apiUrl = `http://localhost:8181/vote/update/${this.voteId}`;

    this.http.put<any>(apiUrl, this.voteForm.value).subscribe(
      response => {
        console.log('Vote updated:', response);
        Swal.fire({
          icon: 'success',
          title: 'Vote mis à jour avec succès!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/vote']);
      },
      error => {
        console.error('Error updating vote:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de la mise à jour du vote. Veuillez réessayer.'
        });
      }
    );
  }

  removeChoice(choice: string) {
    const choicesGroup = this.voteForm.get('choices') as FormGroup;
    choicesGroup.removeControl(choice);
    this.formChanged = true;
  }

  get formControls() {
    const choicesGroup = this.voteForm.get('choices') as FormGroup;
    return choicesGroup.controls;
  }

  navigateToVotes() {
    this.router.navigate(['/vote']);
  }
}
