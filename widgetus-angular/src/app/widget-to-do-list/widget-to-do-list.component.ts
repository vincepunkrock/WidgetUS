import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {HttpService} from '../http.service';
import * as _ from 'underscore';


@Component({
  selector: 'gridster-widget-to-do-list',
  templateUrl: './widget-to-do-list.component.html',
  styleUrls: ['./widget-to-do-list.component.css'],
  providers: [HttpService]
})
export class WidgetToDoListComponent implements OnInit {
  @Output() removed = new EventEmitter();
  @Output() name: string;

  ToDoNote: string;
  nRightClicks = 0;
  ToDoList: Array<String>;


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.ToDoNote = '';
    this.name = 'Tâches à faire';

    this.ToDoList = [
     'http://www.gel.usherbrooke.ca/s6info/e17/doc/projet/',
     'https://drive.google.com/embeddedfolderview?id=0B7R2gk2Et7gCdks3R1g2Q1ZDWjg#list',
     'https://www.gel.usherbrooke.ca/depot/index.php?dir=e17%2Fs6info%2FProjet_Sprint2%2F'
    ];
  }

  removeItem(e) {
    this.removed.emit(e);
  }

  onChangeItemNote(e,item){
    if(e === 'supprimer')
    {
      this._httpService.deleteToDoTask(638)
      .subscribe(
        data => this.ToDoList.splice(this.ToDoList.indexOf(item), 1),
        // error => alert(error),
        error => this.ToDoList.splice(this.ToDoList.indexOf(item), 1),
        () => console.log('Finished')
      );
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
    // update BD
    this._httpService.postToDoTask(638, this.ToDoNote, 0)
      .subscribe(
        data => this.ToDoList.push(this.ToDoNote),
        // error => alert(error),
        error => this.ToDoList.push(this.ToDoNote),
        () => console.log('Finished')
      );
  }

}
