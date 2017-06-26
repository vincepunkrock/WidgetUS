import {Component, OnInit} from '@angular/core';
import {GridsterConfig} from '../lib/gridsterConfig.interface';

@Component({
  selector: 'gridster-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<Object>;
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

    this.dashboard = [
      {cols: 4, rows: 4, y: 0, x: 0, name: 'Horaire'},
      {cols: 2, rows: 2, y: 0, x: 4, name: 'Horaire'},
      {cols: 2, rows: 2, y: 2, x: 4, name: 'Météo'},
    ];
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
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    // ici on va pouvoir ajouter dans la BD
    if (this.dashboard.length < this.MaxWidget) {
      this.dashboard.push({cols: 2, rows: 2, name: 'Horaire'});
    }
  }
}
