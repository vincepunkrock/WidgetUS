import { Component, OnInit, Input } from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
  }

}
