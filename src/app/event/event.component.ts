import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  showCurrentEvents: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    const apiUrl = this.showCurrentEvents ? 'http://localhost:8181/event/getall' : 'http://localhost:8181/event/archivedevent';

    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.events = data;
        this.filteredEvents = [...this.events];
        this.onSearch(); // Optional: Trigger search after fetching events
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  navigateToCreateEvent() {
    this.router.navigate(['/createevent']);
  }

  toggleEvents() {
    this.showCurrentEvents = !this.showCurrentEvents;
    this.fetchEvents(); 
  }

  onSearch() {
    this.currentPage = 1;
    this.filteredEvents = this.events.filter(event =>
      event.eventName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.local.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.time.includes(this.searchTerm.toLowerCase()) || // Assuming time is a string for search
      event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  get paginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEvents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  deleteEvent(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = `http://localhost:8181/event/delete/${id}`;
        this.http.delete(apiUrl).subscribe(
          () => {
            this.events = this.events.filter(event => event.id !== id);
            this.filteredEvents = [...this.events];
            Swal.fire(
              'Supprimé!',
              'L\'événement a été supprimé.',
              'success'
            );
          },
          error => {
            console.error('Error deleting event:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression de l\'événement.',
              'error'
            );
          }
        );
      }
    });
  }

  navigateToEditEvent(eventId: number) {
    this.router.navigate(['/editevent', eventId]);
  }
}
