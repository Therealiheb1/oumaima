import { Component, OnInit, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';
import { ConfigService } from '../../../core/services/config.service';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend?: ApexLegend;
};

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  isVisible: string;

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<any>;
  statData: Array<any>;
  donutAnimateChart: ChartType;

  isActive: string;

  @ViewChild('content') content;
  constructor(private modalService: NgbModal, private configService: ConfigService, private eventService: EventService) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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
    const attribute = document.body.getAttribute('data-layout');
    this.isVisible = attribute;
    const vertical = document.getElementById('layout-vertical');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (attribute == 'horizontal') {
      const horizontal = document.getElementById('layout-horizontal');
      if (horizontal != null) {
        horizontal.setAttribute('checked', 'true');
        console.log(horizontal);
      }
    }

    this.fetchData();
  }

  private fetchData() {
    this.donutAnimateChart = this.donutAnimateChart;
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = 'year';
    this.configService.getConfig().subscribe(data => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }

  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series = [
      { name: 'Series A', data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48] },
      { name: 'Series B', data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18] },
      { name: 'Series C', data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22] }
    ];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series = [
      { name: 'Series A', data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48] },
      { name: 'Series B', data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22] },
      { name: 'Series C', data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18] }
    ];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series = [
      { name: 'Series A', data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22] },
      { name: 'Series B', data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18] },
      { name: 'Series C', data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48] }
    ];
  }

  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }
}
