import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gridster-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @Input () name: string;
  @Output () itemRemoved = new EventEmitter();
  constructor() { }
  
  ngOnInit() {
  }

  removeItem(event){
    this.itemRemoved.emit(event);
  }

}
