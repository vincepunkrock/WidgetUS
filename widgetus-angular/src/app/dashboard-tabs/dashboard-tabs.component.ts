import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { WidgetCalendarPopupContext, WidgetCalendarPopupComponent } from '../widget-calendar-popup/widget-calendar-popup.component';
import {forEach} from "@angular/router/src/utils/collection";
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
  selector: 'gridster-dashboard-tabs',
  templateUrl: './dashboard-tabs.component.html',
  styleUrls: ['./dashboard-tabs.component.css'],
  providers: [Modal]
})
export class DashboardTabsComponent implements OnInit {

  @Input() dashboards;
  @Output() onNewDashboard = new EventEmitter<string>();
  @Output() deleteDashboard = new EventEmitter<string>();
  @Output() onChangeActiveTab = new EventEmitter<string>();
  @Output() onAddWidget = new EventEmitter<string>();

  newDashboardName = '';
  dashboardNameToDelete = '';
  activeTab;

  constructor(public modal: Modal) {}

  ngOnInit() {
    if (this.dashboards != null) {
      this.activeTab = this.dashboards[0].name;
    }
  }

  onAddDashboard() {
    this.onNewDashboard.emit(this.newDashboardName);
  }

  onDeleteDashboard() {
    this.deleteDashboard.emit();
  }

  onAddWidgetClick(widgetType: string) {
    if (widgetType === 'horaire') {
      return this.modal.open(WidgetCalendarPopupComponent,  overlayConfigFactory({ name: 'Horaire', widget:  this.onAddWidget}, BSModalContext));
    } else {
      this.onAddWidget.emit(widgetType);
    }
  }

  onActivedTab(name: string) {
    this.activeTab = name;
    this.onChangeActiveTab.emit(name);
  }
}
