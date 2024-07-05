import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  formations: any[] = [];
  filteredFormations: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  currentApiUrl = 'http://localhost:8181/formation/curentformation';
  archivedApiUrl = 'http://localhost:8181/formation/archivedformation';
  showCurrentFormations: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchCurrentFormations();
  }

  // Method to fetch current formations
  fetchCurrentFormations() {
    this.http.get<any[]>(this.currentApiUrl).subscribe(
      data => {
        this.formations = data;
        this.filteredFormations = [...this.formations];
      },
      error => {
        console.error('Error fetching current formations:', error);
      }
    );
  }

  // Method to fetch archived formations
  fetchArchivedFormations() {
    this.http.get<any[]>(this.archivedApiUrl).subscribe(
      data => {
        this.formations = data;
        this.filteredFormations = [...this.formations];
      },
      error => {
        console.error('Error fetching archived formations:', error);
      }
    );
  }

  toggleFormations() {
    this.showCurrentFormations = !this.showCurrentFormations;
    if (this.showCurrentFormations) {
      this.fetchCurrentFormations();
    } else {
      this.fetchArchivedFormations();
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.filteredFormations = this.formations.filter(formation =>
      formation.formationName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get paginatedFormations() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFormations.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.filteredFormations.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  navigateToCreateFormation() {
    this.router.navigate(['/createformation']);
  }

  navigateToEditFormation(formationId: number) {
    this.router.navigate(['/editformation', formationId]);
  }

  deleteFormation(formationId: number) {
    console.log('Attempting to delete formation with ID:', formationId);

    if (!formationId) {
      console.error('Invalid formation ID:', formationId);
      Swal.fire('Erreur!', 'ID de formation invalide.', 'error');
      return;
    }

    const apiUrl = `http://localhost:8181/formation/delete/${formationId}`;

    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas annuler cette action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(apiUrl).subscribe(
          () => {
            this.formations = this.formations.filter(formation => formation.id !== formationId);
            this.filteredFormations = [...this.formations];
            Swal.fire('Supprimé!', 'Votre formation a été supprimée.', 'success');
          },
          error => {
            console.error('Error deleting formation:', error);
            Swal.fire('Erreur!', 'Erreur lors de la suppression de la formation. Veuillez réessayer.', 'error');
          }
        );
      }
    });
  }
}
