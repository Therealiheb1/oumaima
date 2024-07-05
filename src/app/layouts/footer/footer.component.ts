import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent implements OnInit {

  sponsorLogos: string[] = [];
  

  constructor() { }

  ngOnInit() {
    this.loadSponsorLogos();
  }
  loadSponsorLogos() {
    const logoDir = 'assets/sponsors/';
    this.sponsorLogos = [
      `${logoDir}actia-removebg-preview.png`,
      `${logoDir}altran-removebg-preview.png`,
      `${logoDir}b_d-removebg-preview.png`,
      `${logoDir}fis-removebg-preview.png`,
      `${logoDir}helpline-removebg-preview.png`,
      `${logoDir}impact-removebg-preview.png`,
      `${logoDir}linedata-removebg-preview.png`,
      `${logoDir}manpower-removebg-preview.png`,
      `${logoDir}sagemcom-removebg-preview.png`,
      `${logoDir}tact-removebg-preview.png`,
      `${logoDir}vermeg-removebg-preview.png`,
      `${logoDir}vocalcom-removebg-preview.png`,
      
    ];
  }
}
