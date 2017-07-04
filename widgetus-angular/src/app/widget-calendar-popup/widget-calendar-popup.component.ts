import { Component } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

export class WidgetCalendarPopupContext extends BSModalContext {
  public num1: number;
  public num2: number;
  public name: string;
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

  public wrongAnswer: boolean;

  constructor(public dialog: DialogRef<WidgetCalendarPopupContext>) {
    this.context = dialog.context;
    this.wrongAnswer = true;
    dialog.setCloseGuard(this);
  }

  onKeyUp(value) {
    this.wrongAnswer = value !== 5;
    this.dialog.close();
  }


  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return this.wrongAnswer;
  }
}
