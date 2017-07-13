import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'gridster-opus-navbar',
  templateUrl: './opus-navbar.component.html',
  styleUrls: ['./opus-navbar.component.css'],
  providers: [ HomeService ]
})
export class OpusNavbarComponent implements OnInit {

  authenticatedUser: String = 'gagv2103';
  user: Object;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAuthenticatedUser().subscribe(res => {
      if (res) {
        this.authenticatedUser = res.cip;
        this.user = res;
        sessionStorage.setItem('user', JSON.stringify(this.user));
      }
      else {
        console.log(res);
      }
    }, err => {
      //Only because we can't access the CAS locally -We should add a developper mode or a saiyan mode!
      this.user = {cip: this.authenticatedUser} ;
      sessionStorage.setItem('user', JSON.stringify(this.user));
    });
  }

}
