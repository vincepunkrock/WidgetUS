import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gridster-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
})
export class ToDoListComponent implements OnInit {
  @Output() removed = new EventEmitter();
  @Output() name: string;

  constructor() { }

  ngOnInit() {
    this.name = 'Tâches à faire';
  }

  removeItem(e) {
    this.removed.emit(e);
  }

}
