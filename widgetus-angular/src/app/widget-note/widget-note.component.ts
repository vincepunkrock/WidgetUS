import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gridster-widget-note',
  templateUrl: './widget-note.component.html',
  styleUrls: ['./widget-note.component.css']
})
export class WidgetNoteComponent implements OnInit {

  @Output() removed = new EventEmitter();
  @Output() name: string;

  constructor() { }

  ngOnInit() {
    this.name = 'Notes de cours';
  }

  removeItem(e) {
    this.removed.emit(e);
  }

}
