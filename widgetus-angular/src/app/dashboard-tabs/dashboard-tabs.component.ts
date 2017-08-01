import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
  selector: 'gridster-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css'],
  providers: []
})
export class DashboardTabsComponent implements OnInit {

  @Input() dashboards;
  @Output() onNewDashboard = new EventEmitter<string>();
  @Output() deleteDashboard = new EventEmitter<string>();
  @Output() onChangeActiveTab = new EventEmitter<string>();
  @Output() onAddWidget = new EventEmitter<string>();

  newDashboardName = '';
  dashboardNameToDelete = '';
  @Input() activeTab;

  constructor() {
  }

  ngOnInit() {
    if (this.dashboards != null) {
      this.activeTab = this.dashboards[0].name;
    }
  }

  onAddDashboard() {
    this.onNewDashboard.emit(this.newDashboardName);
  }

  onDeleteDashboard(tab) {
    this.deleteDashboard.emit(tab);
  }

  onAddWidgetClick(widgetType: string) {

    this.onAddWidget.emit(widgetType);
  }

  onActivedTab(name: string) {
    this.activeTab = name;
    this.onChangeActiveTab.emit(name);
  }
}
