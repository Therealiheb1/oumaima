import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  eventId: number;
  event: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.initForm();
    this.fetchEventById();
  }

  initForm() {
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      local: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      image: [''] // This should be initialized with the current image URL
    });

    this.eventForm.valueChanges.subscribe(() => {
      // Track form changes if needed
    });
  }

  fetchEventById() {
    const apiUrl = `http://localhost:8181/event/getbyid/${this.eventId}`;

    this.http.get<any>(apiUrl).subscribe(
      data => {
        this.event = data;
        this.populateForm();
      },
      error => {
        console.error('Error fetching event:', error);
      }
    );
  }

  populateForm() {
    if (this.event) {
      this.eventForm.patchValue({
        eventName: this.event.eventName,
        local: this.event.local,
        time: this.event.time,
        description: this.event.description,
        prix: this.event.prix,
        image: this.event.image // Assuming 'image' is a string URL
      });
    }
  }

  submitEvent() {
    const apiUrl = `http://localhost:8181/event/update/${this.eventId}`;

    this.http.put<any>(apiUrl, this.eventForm.value).subscribe(
      response => {
        console.log('Event updated:', response);
        Swal.fire('Success!', 'Event updated successfully!', 'success');
        this.router.navigate(['/event']);
      },
      error => {
        console.error('Error updating event:', error);
        Swal.fire('Error!', 'Failed to update event. Please try again.', 'error');
      }
    );
  }

  navigateToEvents() {
    this.router.navigate(['/event']);
  }
}
