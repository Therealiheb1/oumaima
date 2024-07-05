import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hackathon',
  templateUrl: './hackathon.component.html',
  styleUrls: ['./hackathon.component.scss']
})
export class HackathonComponent implements OnInit {
  hackathons: any[] = [];
  filteredHackathons: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  showCurrentHackathons: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchHackathons();
  }

  fetchHackathons() {
    const apiUrl = this.showCurrentHackathons ? 'http://localhost:8181/hackathon/getall' : 'http://localhost:8181/hackathon/archived';

    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.hackathons = data;
        this.filteredHackathons = [...this.hackathons];
        this.onSearch();
      },
      error => {
        console.error('Error fetching hackathons:', error);
      }
    );
  }

  toggleHackathons() {
    this.showCurrentHackathons = !this.showCurrentHackathons;
    this.fetchHackathons();
  }

  navigateToCreateHackathon() {
    this.router.navigate(['/createhackathon']);
  }

  onSearch() {
    this.currentPage = 1;
    this.filteredHackathons = this.hackathons.filter(hackathon =>
      hackathon.hackName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      hackathon.local.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      hackathon.time.includes(this.searchTerm.toLowerCase()) || // Assuming time is a string for search
      hackathon.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get paginatedHackathons() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredHackathons.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.filteredHackathons.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  editHackathon(id: number) {
    this.router.navigate(['/edithackathon', id]);
  }

  deleteHackathon(id: number) {
    const apiUrl = `http://localhost:8181/hackathon/delete/${id}`;

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Hackathon!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(apiUrl).subscribe(
          () => {
            Swal.fire('Deleted!', 'Hackathon has been deleted.', 'success');
            this.fetchHackathons(); // Refresh the list after deletion
          },
          error => {
            console.error('Error deleting hackathon:', error);
            Swal.fire('Error!', 'Failed to delete hackathon. Please try again.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your Hackathon is safe :)', 'info');
      }
    });
  }
}
