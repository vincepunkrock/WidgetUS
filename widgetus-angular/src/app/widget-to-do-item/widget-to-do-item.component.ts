import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'gridster-widget-to-do-item',
  templateUrl: './widget-to-do-item.component.html',
  styleUrls: ['./widget-to-do-item.component.css']
})
export class WidgetToDoItemComponent implements OnInit {

  @Input() ToDoContents;
  @Output() onCheckedItem = new EventEmitter<boolean>();


  isChecked: boolean;

  constructor() { }

  ngOnInit() {
    this.isChecked = false;
  }

  onCheck() {
    this.isChecked = !this.isChecked;
    this.onCheckedItem.emit(this.isChecked);
  }
}
