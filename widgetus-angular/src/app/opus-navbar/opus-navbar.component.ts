import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'gridster-opus-navbar',
  templateUrl: './opus-navbar.component.html',
  styleUrls: ['./opus-navbar.component.css'],
  providers: [ HomeService ]
})
export class OpusNavbarComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user'));
  authenticatedUser: String = this.user.name; //Hard code parce que pas acces au CAS en local

  constructor(private homeService: HomeService) { }

  ngOnInit() {

  }

}
