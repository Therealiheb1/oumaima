import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hackathon',
  templateUrl: './hackathon.component.html',
  styleUrls: ['./hackathon.component.scss']
})
export class HackathonComponent implements OnInit {
  hackathons: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAllHackathons();
  }

  fetchAllHackathons() {
    const apiUrl = 'http://localhost:8181/hackathon/getall'; // Update API URL as per your backend

    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.hackathons = data;
      },
      error => {
        console.error('Error fetching hackathons:', error);
      }
    );
  }
}
