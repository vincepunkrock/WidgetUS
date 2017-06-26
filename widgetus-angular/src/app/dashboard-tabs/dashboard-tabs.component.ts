import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gridster-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {

  @Input() dashboards;
  newDashboardName = '';

  constructor() {

  }

  ngOnInit() {
  }

  onAddDashboard() {
    this.dashboards.push({name: this.newDashboardName, active: false});
  }

}
