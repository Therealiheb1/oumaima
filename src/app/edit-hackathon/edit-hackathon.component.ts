import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hackathon',
  templateUrl: './edit-hackathon.component.html',
  styleUrls: ['./edit-hackathon.component.scss']
})
export class EditHackathonComponent implements OnInit {
  hackathonId: number;
  hackathonForm: FormGroup;
  hackathon: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.hackathonId = this.route.snapshot.params['id'];
    this.initForm();
    this.fetchHackathonById();
  }

  initForm() {
    this.hackathonForm = this.formBuilder.group({
      hackName: ['', Validators.required],
      local: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required]
    });
  }

  fetchHackathonById() {
    const apiUrl = `http://localhost:8181/hackathon/getall/${this.hackathonId}`;

    this.http.get<any>(apiUrl).subscribe(
      data => {
        this.hackathon = data;
        this.populateForm();
      },
      error => {
        console.error('Error fetching hackathon:', error);
        // Handle error accordingly
      }
    );
  }

  populateForm() {
    if (this.hackathon) {
      this.hackathonForm.patchValue({
        hackName: this.hackathon.hackName,
        local: this.hackathon.local,
        time: this.hackathon.time,
        description: this.hackathon.description,
        prix: this.hackathon.prix
      });
    }
  }

  submitHackathon() {
    const apiUrl = `http://localhost:8181/hackathon/update/${this.hackathonId}`;
    const formData = this.hackathonForm.value;

    this.http.put<any>(apiUrl, formData).subscribe(
      response => {
        console.log('Hackathon updated:', response);
        Swal.fire('Success!', 'Hackathon updated successfully!', 'success');
        this.router.navigate(['/hackathon']);
      },
      error => {
        console.error('Error updating hackathon:', error);
        Swal.fire('Error!', 'Error updating hackathon. Please try again.', 'error');
      }
    );
  }

  navigateToHackathons() {
    this.router.navigate(['/hackathon']);
  }
}
