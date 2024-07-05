import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  votes: any[] = [];
  filteredVotes: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchVotes();
  }

  fetchVotes() {
    const apiUrl = 'http://localhost:8181/vote/getAll';

    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        console.log('Fetched votes:', data);
        this.votes = data;
        this.filteredVotes = [...this.votes];
        this.onSearch();
      },
      error => {
        console.error('Error fetching votes:', error);
      }
    );
  }

  onSearch() {
    this.currentPage = 1;
    this.filteredVotes = this.votes.filter(vote =>
      vote.voteName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get paginatedVotes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredVotes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.filteredVotes.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  navigateToCreateVote() {
    this.router.navigate(['/createvote']);
  }

  navigateToEditVote(voteId: number) {
    this.router.navigate(['/editvote', voteId]);
  }

  deleteVote(voteId: number) {
    console.log('Attempting to delete vote with ID:', voteId);

    if (!voteId) {
      console.error('Invalid vote ID:', voteId);
      Swal.fire('Erreur!', 'ID de vote invalide.', 'error');
      return;
    }

    const apiUrl = `http://localhost:8181/vote/${voteId}`;

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
            this.votes = this.votes.filter(vote => vote.id !== voteId);
            this.filteredVotes = [...this.votes];
            Swal.fire('Supprimé!', 'Votre vote a été supprimé.', 'success');
          },
          error => {
            console.error('Error deleting vote:', error);
            Swal.fire('Erreur!', 'Erreur lors de la suppression du vote. Veuillez réessayer.', 'error');
          }
        );
      }
    });
  }
}
