import { Component, EventEmitter} from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class WidgetCalendarPopupContext extends BSModalContext {
  public name: string;
  public widget = new EventEmitter<string>();
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'gridster-widget-calendar-popup',
  styleUrls: ['./widget-calendar-popup.component.css'],
  templateUrl: './widget-calendar-popup.component.html'
})
export class WidgetCalendarPopupComponent implements CloseGuard, ModalComponent<WidgetCalendarPopupContext> {
  context: WidgetCalendarPopupContext;
  popupObj = {
    name : '',
    ical: '',
    color: ''
  };

  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<WidgetCalendarPopupContext>) {
    this.context = dialog.context;
    this.popupObj.name = this.context.name;
    dialog.setCloseGuard(this);
  }

  enterName(value) {
    this.popupObj.name = value;
  }

  enterIcal(value) {
    this.popupObj.ical = value;
  }

  cancel() {
    this.dialog.dismiss();
  }
  save() {
    this.dialog.close();
    this.context.widget.emit('horaire');
  }
}
