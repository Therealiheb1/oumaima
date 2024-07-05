import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCurrentEvents();
  }

  fetchCurrentEvents() {
    const apiUrl = 'http://localhost:8181/event/curentevent'; // Update API URL as per your backend

    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.events = data;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
