import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
  selector: 'gridster-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css']
})
export class DashboardTabsComponent implements OnInit {

  @Input() dashboards;
  @Output() onNewDashboard = new EventEmitter<string>();
  newDashboardName = '';
  activeTab;

  constructor() {

  }

  ngOnInit() {
    if (this.dashboards != null) {
      this.activeTab = this.dashboards[0].name;
    }
  }

  onAddDashboard() {
    // this.dashboards.push({name: this.newDashboardName, active: false});
    this.onNewDashboard.emit(this.newDashboardName);
  }

  onActivedTab(name: string) {
    this.activeTab = name;
  }
}
