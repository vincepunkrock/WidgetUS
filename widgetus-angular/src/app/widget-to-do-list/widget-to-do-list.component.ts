import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'gridster-widget-to-do-list',
  templateUrl: './widget-to-do-list.component.html',
  styleUrls: ['./widget-to-do-list.component.css']
})
export class WidgetToDoListComponent implements OnInit {
  @Input() ToDoList;
  @Output() removed = new EventEmitter();
  @Output() onChangeCheck = new EventEmitter();
  @Output() onAddNoteEv = new EventEmitter<string>();
  @Output() name: string;

  ToDoNote: string;


  constructor() {
  }

  ngOnInit() {
    this.ToDoNote = '';
    this.name = 'Tâches à faire';
  }

  removeItem(e) {
    this.removed.emit(e);
  }


  onCheck(e) {
    this.onChangeCheck.emit(e);
  }

  onAddNote() {
    if (this.ToDoNote !== '') {
      this.onAddNoteEv.emit(this.ToDoNote);
    }
    this.ToDoNote = '';
  }
}
