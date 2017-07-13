import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gridster-opus-navbar',
  templateUrl: './opus-navbar.component.html',
  styleUrls: ['./opus-navbar.component.css'],
  providers: [ ]
})
export class OpusNavbarComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user')) || "gagv2103";
  authenticatedUser: String = this.user.cip; //Hard code parce que pas acces au CAS en local

  constructor() { }

  ngOnInit() {

  }

}
