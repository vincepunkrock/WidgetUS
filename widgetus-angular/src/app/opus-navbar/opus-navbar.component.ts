import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'gridster-opus-navbar',
  templateUrl: './opus-navbar.component.html',
  styleUrls: ['./opus-navbar.component.css'],
  providers: [ HomeService ]
})
export class OpusNavbarComponent implements OnInit {

  authenticatedUser: String = "";

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAuthenticatedUser().subscribe(res => {
      if(res && res.cip){
        this.authenticatedUser = res.cip;
      }
      else {
        console.log(res);
      }
    }, err => {

    });
  }

}
