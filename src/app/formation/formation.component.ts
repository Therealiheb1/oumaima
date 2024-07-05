import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  formations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCurrentFormations();
  }

  fetchCurrentFormations() {
    const apiUrl = 'http://localhost:8181/formation/curentformation';

    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.formations = data;
        console.log('data : ',data)
      },
      error => {
        console.error('Error fetching current formations:', error);
      }
    );
  }
}
