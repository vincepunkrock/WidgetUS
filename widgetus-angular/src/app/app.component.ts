import {Component, OnInit} from '@angular/core';
import {GridsterConfig} from '../lib/gridsterConfig.interface';
import {GridsterComponent} from '../lib/gridster.component';

@Component({
  selector: 'gridster-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  options: GridsterConfig;
  dashboards;
  dashboard: Array<Object>;
  widgets: Array<Object>;
  activeDashboard = 0;
  MaxWidget: number;

  static eventStop(item, scope, event) {
    console.info('eventStop', item, scope);
  }

  static itemChange(item, scope) {
    console.info('itemChanged', item, scope);
  }

  static itemResize(item, scope) {
    console.info('itemResized', item, scope);
  }

  static itemInit(item) {
    console.info('itemInitialized', item);
  }

  ngOnInit() {
    this.MaxWidget = 10;

    this.options = {
      gridType: 'fit',
      compactUp: false,
      compactLeft: false,
      itemChangeCallback: AppComponent.itemChange,
      itemResizeCallback: AppComponent.itemResize,
      margin: 10,
      outerMargin: true,
      minCols: 1,
      maxCols: 10,
      minRows: 1,
      maxRows: 10,
      maxItemCols: 10,
      minItemCols: 1,
      maxItemRows: 10,
      minItemRows: 1,
      defaultItemCols: 5,
      defaultItemRows: 5,
      fixedColWidth: 250,
      fixedRowHeight: 250,
      draggable: {
        enabled: true,
        stop: AppComponent.eventStop
      },
      resizable: {
        enabled: true,
        stop: AppComponent.eventStop
      },
      swap: false,
      displayGrid: 'none'
    };

    this.dashboards = [
      {name: 'dash 1', active: false, widgets: [{cols: 4, rows: 4, y: 0, x: 0}, {cols: 2, rows: 2, y: 0, x: 4},{cols: 2, rows: 2, y: 2, x: 4}]},
      {name: 'dash 2', active: false, widgets: []},
      {name: 'dash 3', active: false, widgets: []}
    ];

    // this.dashboard = [
    //   {cols: 4, rows: 4, y: 0, x: 0},
    //   {cols: 2, rows: 2, y: 0, x: 4},
    //   {cols: 2, rows: 2, y: 2, x: 4},
    // ];

    this.widgets = [
      {cols: 4, rows: 4, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 4},
      {cols: 2, rows: 2, y: 2, x: 4},
    ];
  }

  changedOptions() {
    this.options.optionsChanged();
  }
  openSettings()
  {
   this.addItem();
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.widgets.splice(this.widgets.indexOf(item), 1);
  }

  addItem() {
    // ici on va pouvoir ajouter dans la BD
    if (this.widgets.length < this.MaxWidget)
    {
      this.widgets.push({cols: 2, rows: 2});
    }
  }

  onNewDashboard(newDashboardName: string) {
    this.dashboards.push({name: newDashboardName, active: false, widgets: []});
  }
}
