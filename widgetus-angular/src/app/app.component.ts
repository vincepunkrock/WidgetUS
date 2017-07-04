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
  ToDoList: Array<String>;
  widgets: Array<Object>;
  activeDashboardID = 0;
  currentDashboard_id;
  MaxWidget: number;
  activeDashboardName: string;
  getData;
  widName: string;
  ncols: number;
  nrows: number;

  typeNameToTypeId = {
    list: 1,
    meteo: 2,
    horaire: 3
  };

  constructor(private _httpService: HttpService) {
  }

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
      gridType: 'fixed',
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
      defaultItemCols: 1,
      defaultItemRows: 1,
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
      swap: true,
      displayGrid: 'none'
    };


this.ToDoList = [
 'Faire le lavage',
 'Inscription au gym',
 'Faire les lectures pour APP4'
];
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

  openSettings(wname: string, widgettype: string) {
    this.addItem(wname, widgettype,2,2);
  }

  removeItem(event, item) {
    event.preventDefault();
    event.stopPropagation();
    this.widgets.splice(this.widgets.indexOf(item), 1);
  }

  addItem(wname: string, widgettype: string,col :number, row: number ) {
    // ici on va pouvoir ajouter dans la BD
    // let config = {cols: 2, rows: 2, type_widget_id: widgettype, dashboard_id: this.currentDashboard_id};
    let config = {width: 1, height: 1, type_widget_id: this.typeNameToTypeId[widgettype], dashboard_id: this.currentDashboard_id};
    if (this.widgets.length < this.MaxWidget) {
      if (widgettype === 'meteo' || widgettype === 'horaire' || widgettype === 'list') {

        this._httpService.postWidget(config)
          .subscribe(
            data => this.widgets.push({cols: col, rows: row, name: wname, wtype: widgettype}),
            // error => alert(error),
            error => this.widgets.push({cols: col, rows: row, name: wname, wtype: widgettype}),
            () => console.log('Finished')
          );
      }
    }
  }

  onAddWidget(widgetType: string) {
    if (this.widgets.length < this.MaxWidget) 
    {
      switch(widgetType)
      {
        case 'meteo': this.widName = 'Météo';this.ncols = 2;this.nrows=1; break;
        case 'horaire': this.widName = 'Horaire';this.ncols = 2;this.nrows=2; break;
        case 'list': this.widName = 'Tâche à faire';this.ncols = 2;this.nrows=1; break;

        default:
          widgetType = 'meteo';
          this.widName = 'Météo';
          this.ncols = 2;
          this.nrows=1;
        break;
      }

      this.addItem(this.widName,widgetType,this.ncols,this.nrows);
      //this.widgets.push({cols: 2, rows: 2, name: this.widName, wtype: widgetType});
    }
  }


  onNewDashboard(newDashboardName: string) {
    this._httpService.postDashboard(newDashboardName)
      .subscribe(
        data => {
          this.dashboards.push({name: newDashboardName, widgets: []});
        },
        error => alert(error),
        () => console.log('Finished')
      );
}


onChangeCheck() {
// when task done
}

  onChangeActiveTab(newActiveDashboard: string) {
    this.activeDashboardName = newActiveDashboard;
    this.activeDashboardID = _.indexOf(_.pluck(this.dashboards, 'name'), this.activeDashboardName);
    this.widgets = this.dashboards[this.activeDashboardID].widgets;
    this.currentDashboard_id = this.dashboards[this.activeDashboardID].id;
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

          let groups = _.groupBy(data, function (value: any) {
            return value.cip + '#' + value.dashboard_name;
          });

          this.dashboards = _.map(groups, function (group) {
            return {
              cip: group[0].cip,
              name: group[0].dashboard_name,
              id: group[0].dashboard_id,
              widgets: _.map(group, function (config) {
                return {
                  id: config.widget_id,
                  wtype_id: config.type_id,
                  wtype: config.widget_type,
                  y: config.y_position,
                  x: config.x_position,
                  cols: config.width,
                  rows: config.height
                };
              })
            };
          });
          this.widgets = this.dashboards[this.activeDashboardID].widgets;
          this.currentDashboard_id = this.dashboards[this.activeDashboardID].id;
        },
        error => alert(error),
        () => console.log('Finished')
      );
  }

  onAddNoteEv(note: string){
    this.ToDoList.push(note);
  }
}
