import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-formation',
  templateUrl: './edit-formation.component.html',
  styleUrls: ['./edit-formation.component.scss']
})
export class EditFormationComponent implements OnInit {
  formationId: number;
  formationForm: FormGroup;
  formation: any; // Define a specific type/interface for your data

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formationId = this.route.snapshot.params['id'];
    this.initForm();
    this.fetchFormationById();
  }

  initForm() {
    this.formationForm = this.formBuilder.group({
      formationName: ['', Validators.required],
      local: ['', Validators.required],
      timeB: ['', Validators.required],
      timeE: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      lien_inscription: ['']
    });
  }

  fetchFormationById() {
    const apiUrl = `http://localhost:8181/formation/getbyid/${this.formationId}`;

    this.http.get<any>(apiUrl).subscribe(
      data => {
        this.formation = data;
        this.populateForm();
      },
      error => {
        console.error('Error fetching formation:', error);
        // Handle error accordingly
      }
    );
  }

  populateForm() {
    if (this.formation) {
      this.formationForm.patchValue({
        formationName: this.formation.formationName,
        local: this.formation.local,
        timeB: this.formation.timeB,
        timeE: this.formation.timeE,
        description: this.formation.description,
        prix: this.formation.prix,
        lien_inscription: this.formation.lien_inscription
      });
    }
  }

  submitFormation() {
    const apiUrl = `http://localhost:8181/formation/update/${this.formationId}`;
    const formData = this.formationForm.value;

    this.http.put<any>(apiUrl, formData).subscribe(
      response => {
        console.log('Formation updated:', response);
        Swal.fire('Succès!', 'Formation mise à jour avec succès!', 'success');
        this.router.navigate(['/formations']);
      },
      error => {
        console.error('Error updating formation:', error);
        Swal.fire('Erreur!', 'Erreur lors de la mise à jour de la formation. Veuillez réessayer.', 'error');
      }
    );
  }

  navigateToFormations() {
    this.router.navigate(['/formations']);
  }
}
