import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gridster-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {

  dashboards = [
    {name: 'dashboard1', active: true},
    {name: 'dashboard2', active: false},
    {name: 'dashboard3', active: false}
    ];
  newDashboardName = '';

  constructor() {

  }

  ngOnInit() {
  }

  onAddDashboard() {
    this.dashboards.push({name: this.newDashboardName, active: false});
  }

}
