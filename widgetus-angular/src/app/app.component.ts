import {Component, OnInit} from '@angular/core';
import {GridsterConfig} from '../lib/gridsterConfig.interface';
import * as _ from 'underscore';

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
  activeDashboardID = 0;
  MaxWidget: number;
  activeDashboardName: string;
  calendarOptions: Object;

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

    this.calendarOptions = {
      height: 'parent',
      fixedWeekCount : false,
      defaultDate: '2016-09-12',
      defaultView: 'agendaDay',
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2016-09-01'
        },
        {
          title: 'Long Event',
          start: '2016-09-07',
          end: '2016-09-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-09-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-09-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2016-09-11',
          end: '2016-09-13'
        },
        {
          title: 'Meeting',
          start: '2016-09-12T10:30:00',
          end: '2016-09-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2016-09-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2016-09-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2016-09-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2016-09-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2016-09-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2016-09-28'
        }
      ]
    };

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
      {
        name: 'dash 1',
        active: false,
        widgets: [{cols: 4, rows: 4, y: 0, x: 0}, {cols: 2, rows: 2, y: 0, x: 4}, {cols: 2, rows: 2, y: 2, x: 4}]
      },
      {name: 'dash 2', active: false, widgets: []},
      {name: 'dash 3', active: false, widgets: []}
    ];

    this.widgets = this.dashboards[this.activeDashboardID].widgets;
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
    if (this.widgets.length < this.MaxWidget) {
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


}
