import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gridster-dashboard-tab',
  templateUrl: './dashboard-tab.component.html',
  styles: [`
    .pane{
      padding: 1em;
    }
  `]
})
export class DashboardTabComponent implements OnInit {

  @Input() tabName;
  @Input() tabActive;
  @Output() onActivedTab = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onLoadDashboard() {
    this.onActivedTab.emit(this.tabName);
  }
}
