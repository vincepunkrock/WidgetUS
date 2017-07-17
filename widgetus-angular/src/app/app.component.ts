import {Component, OnInit} from '@angular/core';
import {GridsterConfig} from '../lib/gridsterConfig.interface';
import {HttpService} from './http.service';
import * as _ from 'underscore';
import { HomeService } from './home.service';

@Component({
  selector: 'gridster-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService, HomeService]
})
export class AppComponent implements OnInit {

  authenticatedUser: String = 'gagv2103'; //Hard code parce que pas acces au CAS en local
  user: Object;

  options: GridsterConfig;
  dashboards;
  dashboard: Array<Object>;
  ToDoList: Array<String>;
  widgets: Array<Object>;
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
    météo: 3
  };

  constructor(private _httpService: HttpService, private homeService: HomeService) {
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
        console.log(res);
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


    this.ToDoList = [
     'Faire le lavage',
     'Inscription au gym',
     'Faire les lectures pour APP4'
    ];
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

    this._httpService.deleteWidget(item.id)
      .subscribe(
        data => {
          this.loadDashboard();
        },
        error => alert(error),
        () => console.log('Finished')
      );

  }

  addItem(wname: string, widgettype: string,col :number, row: number ) {
    // ici on va pouvoir ajouter dans la BD
    // let config = {cols: 2, rows: 2, type_widget_id: widgettype, dashboard_id: this.currentDashboard_id};
    let config = {width: col, height: row, type_widget_id: this.typeNameToTypeId[widgettype], dashboard_id: this.currentDashboard_id};
    if (this.widgets.length < this.MaxWidget) {
      if (widgettype === 'météo' || widgettype === 'horaire' || widgettype === 'note') {

        this._httpService.postWidget(config)
          .subscribe(
            data => this.loadDashboard(),
            error => this.loadDashboard(), //Should be alert(error), mais postgRest retourne un erreur meme si le widget est ajouté...Donc fix temporaire
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
        case 'météo': this.widName = 'Météo';this.ncols = 2;this.nrows=1; break;
        case 'horaire': this.widName = 'Horaire';this.ncols = 2;this.nrows=2; break;
        case 'note': this.widName = 'Tâche à faire';this.ncols = 2;this.nrows=1; break;

        default:
          widgetType = 'météo';
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
          this.loadDashboard();
        },
        error => alert(error),
        () => console.log('Finished')
      );
  }

  deleteDashboard() {
    this._httpService.deleteDashboard(this.currentDashboard_id)
      .subscribe(
        data => {
          this.loadDashboard();
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
          this.checkUserDashboard();
          this.widgets = this.dashboards[this.activeDashboardID].widgets;
          this.currentDashboard_id = this.dashboards[this.activeDashboardID].id;
        },
        error => alert(error),
        () => console.log('Finished')
      );
  }

  checkUser(cip) {
    this._httpService.getUserFromDB(cip)
      .subscribe(
        data => {
          if (_.isEmpty(data)) {
            //Create a new user in the DB, should be OK because he was first authentificated by the CAS
            this.addUserToDB(cip);
          }
        },
        error => alert(error),
        () => {
          console.log('Finished');
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
        () => console.log('Finished')
      );
  }

  checkUserDashboard() {
    // alert(JSON.stringify(this.dashboards));
  }

  onAddNoteEv(note: string){
    this.ToDoList.push(note);
  }
}
