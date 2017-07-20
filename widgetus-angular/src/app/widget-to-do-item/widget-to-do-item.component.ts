import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'gridster-widget-to-do-item',
  templateUrl: './widget-to-do-item.component.html',
  styleUrls: ['./widget-to-do-item.component.css']
})
export class WidgetToDoItemComponent implements OnInit {
  @Input() ToDoContents;
  @Output() onChangeListItem = new EventEmitter<string>();

  isChecked: boolean;
  complete: string;

  constructor() { }
  
  ngOnInit() {
    this.complete = 'complété';
    this.isChecked = false;
  }

  onCheck() {
    this.isChecked = !this.isChecked;
    if(this.isChecked){
      this.complete = 'non-complété';
    }
    else{
      this.complete = 'complété';
    }
    this.onChangeListItem.emit(this.complete);
  }

  onDelete() {
    this.onChangeListItem.emit('supprimer');
  }

}
