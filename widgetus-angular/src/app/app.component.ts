import {Component, OnInit} from '@angular/core';
import {GridsterConfig} from '../lib/gridsterConfig.interface';
import {HttpService} from './http.service';
import * as _ from 'underscore';

@Component({
  selector: 'gridster-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit {
  options: GridsterConfig;
  dashboards;
  dashboard: Array<Object>;
  widgets: Array<Object>;
  activeDashboardID = 0;
  MaxWidget: number;
  activeDashboardName: string;
  getData;

  test;

  constructor(private _httpService: HttpService) {}

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

    this.loadDashboard();
    // this.dashboards = [
    //   {name: 'dash 1', widgets: [{cols: 4, rows: 4, y: 0, x: 0}, {cols: 2, rows: 2, y: 0, x: 4},{cols: 2, rows: 2, y: 2, x: 4}]},
    //   {name: 'dash 2', widgets: []},
    //   {name: 'dash 3', widgets: []}
    // ];

    // this.widgets = this.dashboards[this.activeDashboardID].widgets;
  }

  changedOptions() {
    this.options.optionsChanged();
  }
  openSettings() {
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

  onChangeActiveTab(newActiveDashboard: string) {
    this.activeDashboardName = newActiveDashboard;
    this.activeDashboardID = _.indexOf(_.pluck(this.dashboards, 'name'), this.activeDashboardName);
    this.widgets = this.dashboards[this.activeDashboardID].widgets;
  }

  onTestGet() {
    this._httpService.getUsers()
      .subscribe(
        data => this.getData = JSON.stringify(data),
        error => alert(error),
        () => console.log('Finished')
      );
  }

  loadDashboard() {
    this._httpService.getDashboards()
      .subscribe(
        data => {
          // this.getData = JSON.stringify(data);

          let groups = _.groupBy(data, function(value:any){
            return value.cip + '#' + value.dashboard_name;
          });

          this.dashboards = _.map(groups, function(group){
            return {
              cip: group[0].cip,
              name: group[0].dashboard_name,
              widgets: _.map(group, function(config){
                return {
                  id: config.widget_id,
                  wtype: config.widget_type,
                  cols: config.y_position,
                  rows: config.x_position,
                  x: config.width,
                  y: config.height
                };
              })
            };
          });
          this.test = JSON.stringify(this.dashboards);
          this.widgets = this.dashboards[this.activeDashboardID].widgets;
        },
        error => alert(error),
        () => console.log('Finished')
      );

  }
}
