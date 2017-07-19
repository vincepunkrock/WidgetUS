import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'gridster-widget-to-do-list',
  templateUrl: './widget-to-do-list.component.html',
  styleUrls: ['./widget-to-do-list.component.css']
})
export class WidgetToDoListComponent implements OnInit {
  @Output() removed = new EventEmitter();
  @Output() name: string;

  ToDoNote: string;
  nRightClicks = 0;
  ToDoList: Array<String>;


  constructor() { }

  ngOnInit() {
    this.ToDoNote = '';
    this.name = 'Tâches à faire';

    this.ToDoList = [
     'Faire le lavage',
     'Inscription au gym',
     'Faire les lectures pour APP4'
    ];
  }

  removeItem(e) {
    this.removed.emit(e);
  }

  onChangeItemNote(e,item){
    if(e === 'supprimer')
    {
      this.ToDoList.splice(this.ToDoList.indexOf(item), 1);
      // update BD
    }
    else if(e === 'complété'){
      // update BD
    }
    else if(e === 'non-complété'){
      // update BD
    }
  }

  onAddNote(){
    this.ToDoList.push(this.ToDoNote);
    // update BD
  }
}
