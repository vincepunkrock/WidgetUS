import {Component, OnInit} from '@angular/core';
import {GridsterConfig} from '../lib/gridsterConfig.interface';
import {HttpService} from './http.service';
import * as _ from 'underscore';
import {HomeService} from './home.service';
import * as nodeIcal from 'node-ical';
import * as async from 'async';
import {reject} from "q";

@Component({
  selector: 'gridster-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService, HomeService]
})
export class AppComponent implements OnInit {

  authenticatedUser: String = 'balp2101'; //Hard code parce que pas acces au CAS en local
  user: Object;

  options: GridsterConfig;
  dashboards;
  dashboard: Array<Object>;
  events = [];
  widgets: Array<any>;
  activeDashboardID = 0;
  currentDashboard_id;  //dashboard_id in the table dashboard in the DB
  MaxWidget: number;
  activeDashboardName: string;
  getData;
  widName: string;
  ncols: number;
  nrows: number;

  typeNameToTypeId = {
    note: 1,
    horaire: 2,
    météo: 3,
    noteCours: 4,
    custom: 5
  };

  constructor(private _httpService: HttpService, private homeService: HomeService) {
  }

  static eventStop(item, scope, event) {
    //console.info('eventStop', item, scope);
  }

  static itemChange(item, scope) {
    // console.info('itemChanged', item, scope);
  }

  itemUpdate(item) {

    if (this._httpService != null && item.id != null) {

      let config = {width: item.cols, height: item.rows, y_position: item.y, x_position: item.x};
      this._httpService.updateWidget(config, item.id)
        .subscribe(
          data => this.updateDashboardObject(),
          error => console.error('itemUpdate - ERROR - ' + error),
          () => {
          }
        );
    }
  }

  static itemResize(item, scope) {
    //console.info('itemResized', item, scope);
  }

  static itemInit(item) {
    // console.info('itemInitialized', item);
  }

  getUserInformations() {
    return this.homeService.getAuthenticatedUser();
  }

  load() {
    this.getUserInformations().subscribe(res => {

      if (res && res.cip) {
        this.authenticatedUser = res.cip;
        this.user = {cip: this.authenticatedUser};
        sessionStorage.setItem('user', JSON.stringify(this.user));
        this.checkUser(this.authenticatedUser);
        this.loadDashboard();
      }
      else {
        console.log('No cip from getUserInformations');
      }

    }, err => {

      //Only because we can't access the CAS locally -We should add a developper mode or a saiyan mode!
      this.user = {cip: this.authenticatedUser};
      sessionStorage.setItem('user', JSON.stringify(this.user));
      this.checkUser(this.authenticatedUser);
      this.loadDashboard();
    });
  }

  ngOnInit() {

    this.load();

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
  }

  changedOptions() {
    this.options.optionsChanged();
  }

  openSettings(wname: string, widgettype: string) {
    this.addItem(wname, widgettype, 2, 2);
  }

  removeItem(event, item) {
    event.preventDefault();
    event.stopPropagation();
    this.widgets.splice(this.widgets.indexOf(item), 1);

    this._httpService.deleteWidget(item.id)
      .subscribe(
        data => {
          this.updateDashboardObject();
        },
        error => alert(error),
        () => {
          //console.log('Finished')
        }
      );

  }

  addItem(wname: string, widgettype: string, col: number, row: number) {

    let config = {
      width: col,
      height: row,
      type_widget_id: this.typeNameToTypeId[widgettype],
      dashboard_id: this.currentDashboard_id
    };
    if (this.widgets.length < this.MaxWidget) {
      if (widgettype === 'météo' || widgettype === 'note' || widgettype === 'noteCours' || widgettype === 'custom') {

        this._httpService.postWidget(config)
          .subscribe(
            data => {
              this.updateDashboardObject().then(
                (success) => {
                  if (success) {
                    let widgetNb = this.dashboards[this.activeDashboardID].widgets.length;
                    let tmpWidgets = _.sortBy(this.dashboards[this.activeDashboardID].widgets, function (obj: any) {
                      return obj.id;
                    });
                    this.widgets.push(tmpWidgets[widgetNb - 1]);
                  }
                });
            },
            error => {
              window.alert(error);
            },
            () => {
              //console.log('Finished')
            }
          );
      }
    }
  }

  onAddWidget(widgetType: string) {
    if (this.widgets.length < this.MaxWidget) {
      switch (widgetType) {
        case 'météo':
          this.widName = 'Météo';
          this.ncols = 2;
          this.nrows = 1;
          break;
        case 'horaire':
          this.widName = 'Horaire';
          this.ncols = 2;
          this.nrows = 2;
          break;
        case 'note':
          this.widName = 'Tâche à faire';
          this.ncols = 2;
          this.nrows = 1;
          break;
        case 'noteCours':
          this.widName = 'Notes de cours';
          this.ncols = 2;
          this.nrows = 1;
          break;
        case 'custom':
          this.widName = 'Custom';
          this.ncols = 2;
          this.nrows = 1;
          break;

        default:
          widgetType = 'note';
          this.widName = 'Tâche à faire';
          this.ncols = 2;
          this.nrows = 1;
          break;
      }

      this.addItem(this.widName, widgetType, this.ncols, this.nrows);
      // this.widgets.push({cols: 2, rows: 2, name: this.widName, wtype: widgetType});
    }
  }


  onNewDashboard(newDashboardName: string) {
    this._httpService.postDashboard(newDashboardName)
      .subscribe(
        data => {
          this.dashboards.push({name: newDashboardName, widgets: []});
          this.loadDashboard();
          this.onChangeActiveTab(newDashboardName);

        },
        error => alert(error),
        () => {
          // console.log('Finished')
        }
      );
  }

  deleteDashboard(tab) {
    this._httpService.deleteDashboard(tab.id)
      .subscribe(
        data => {
          let index = this.dashboards.map(function(e) { return e.id; }).indexOf(tab.id);
          this.dashboards.splice(index, 1);
          this.activeDashboardID = 0;
          this.currentDashboard_id = this.dashboards[this.activeDashboardID].id;
          this.loadDashboard();
          console.info(this.activeDashboardName + ' ' + this.activeDashboardID  + ' ' + this.currentDashboard_id);
        },
        error => alert(error),
        () => {
          // console.log('Finished')
        }
      );
  }

  onChangeActiveTab(newActiveDashboard: string) {
    this.activeDashboardName = newActiveDashboard;
    this.activeDashboardID = _.indexOf(_.pluck(this.dashboards, 'name'), this.activeDashboardName);
    this.widgets = this.dashboards[this.activeDashboardID].widgets;
    this.currentDashboard_id = this.dashboards[this.activeDashboardID].id;
    console.info(this.activeDashboardName + ' ' + this.activeDashboardID  + ' ' + this.currentDashboard_id);
  }

  onTestGet() {
    this._httpService.getUsers()
      .subscribe(
        data => this.getData = JSON.stringify(data),
        error => alert(error),
        () => {
          // console.log('Finished')
        }
      );
  }

  loadDashboard() {
    let that = this;
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
                  rows: config.height,
                  properties: {
                    keyName: config.key_name,
                    keyValue: config.key_value
                  }
                };
              })
            };
          });

          this.dashboards = _.sortBy(this.dashboards, function (obj: any) {
            return obj.id;
          });

          async.map(this.dashboards[this.activeDashboardID].widgets, (config: any, callback) => {

            callback(null, config);

          }, (err, results) => {
            this.widgets = results;
            this.currentDashboard_id = this.dashboards[this.activeDashboardID].id;
            this.activeDashboardName = this.dashboards[this.activeDashboardID].name;
          });
        },
        error => alert(error),
        () => {
          // console.log('Finished')
        }
      );
  }

  // Same thing of loadDashboard() BUT doesn't have  this.widgets = results;  SO the widgets are not all refreshed
  updateDashboardObject() {
    return new Promise((resolve, reject) => {

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
                  rows: config.height,
                  properties: {
                    keyName: config.key_name,
                    keyValue: config.key_value
                  }
                };
              })
            };
          });

          this.dashboards = _.sortBy(this.dashboards, function (obj: any) {
            return obj.id;
          });

          this.currentDashboard_id = this.dashboards[this.activeDashboardID].id;
          this.activeDashboardName = this.dashboards[this.activeDashboardID].name;
          resolve(true);
        },
        error => {
          console.error('updateDashboard - ERROR - ' + error);
          reject(true);
        }
      );
    });
  }

  checkUser(cip) {
    this._httpService.getUserFromDB(cip)
      .subscribe(
        data => {
          if (_.isEmpty(data)) {
            // Create a new user in the DB, should be OK because he was first authentificated by the CAS
            this.addUserToDB(cip);
          }
        },
        error => alert(error),
        () => {
          // console.log('Finished');
        }
      );
  }

  addUserToDB(cip) {
    this._httpService.postNewUser(cip)
      .subscribe(
        data => {
          console.info('user added...');
        },
        error => alert(error),
        () => {
          // console.log('Finished');
        }
      );
  }

}
