import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';
import { ConfigService } from '../../../core/services/config.service';
import { ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
    series: any[];
    chart: any;
    labels: string[];
    responsive: any[];
    legend?: any;
};

@Component({
    selector: 'app-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

    @ViewChild("chart") chart: ChartComponent;

    chartOptions: Partial<ChartOptions>;
    votes: any[] = [];
    selectedCandidate: string = '';

    constructor(private http: HttpClient, private modalService: NgbModal, private configService: ConfigService, private eventService: EventService) {
        this.chartOptions = {
            series: [],
            chart: {
                width: 380,
                type: "pie"
            },
            labels: [],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        };
    }

    ngOnInit() {
        this.fetchAllVotes();
    }

    fetchAllVotes() {
        const apiUrl = 'http://localhost:8181/vote/getAll';
        console.log('Fetching all votes from:', apiUrl);

        this.http.get<any[]>(apiUrl).subscribe(
            data => {
                this.votes = data;
                console.log('Votes fetched successfully:', this.votes);
                if (this.votes.length > 0) {
                    this.updateChartData(this.votes[0]);
                } else {
                    console.log('No votes found.');
                }
            },
            error => {
                console.error('Error fetching votes:', error);
            }
        );
    }

    updateChartData(vote: any) {
        if (!vote || typeof vote.choices !== 'object') {
            console.error('Invalid vote structure or choices object not found.');
            return;
        }

        const seriesData = [];
        const labels = [];

        console.log('Updating chart data for vote:', vote);

        // Convert choices object into array
        const choicesArray = Object.keys(vote.choices).map(key => vote.choices[key]);

        choicesArray.forEach((choice: any, index: number) => {
            labels.push(`Choice ${index + 1}`);
            seriesData.push(choice);
        });

        this.chartOptions.series = seriesData;
        this.chartOptions.labels = labels;
        console.log('Chart options set to:', this.chartOptions);
    }

    voteForCandidate(candidateIndex: number) {
        if (!this.votes || this.votes.length === 0 || !this.votes[0].vote_id) {
            console.error('Invalid vote data.');
            return;
        }

        const voteId = this.votes[0].vote_id;
        const choiceName = `Choice ${candidateIndex + 1}`; // Assuming choice names are structured like "Choice 1", "Choice 2", etc.
        const apiUrl = `http://localhost:8181/vote/${voteId}/vote?choiceName=${encodeURIComponent(choiceName)}`;
        console.log('Voting for candidate index:', candidateIndex + 1, 'with URL:', apiUrl);

        this.http.post<any>(apiUrl, {}).subscribe(
            response => {
                console.log('Vote successful:', response);
                this.updateChartData(response);
                this.activateChoice(candidateIndex);
            },
            error => {
                console.error('Error voting:', error);
            }
        );
    }

    activateChoice(candidateIndex: number) {
        this.selectedCandidate = `Choice ${candidateIndex + 1}`; // Update selected candidate for UI feedback
    }
}
