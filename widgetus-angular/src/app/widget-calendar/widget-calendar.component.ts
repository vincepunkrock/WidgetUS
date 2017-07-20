import {Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ElementRef} from '@angular/core';
import {Overlay} from 'angular2-modal';
import {CalendarService} from '../calendar.service';

@Component({
  selector: 'gridster-widget-calendar',
  templateUrl: './widget-calendar.component.html',
  styleUrls: ['./widget-calendar.component.css'],
  providers: [CalendarService]
})


export class WidgetCalendarComponent implements OnInit {
  @ViewChild('mycal', {read: ElementRef}) myCal: ElementRef;
  @Input() events;
  @Input() widget;
  @Output() removed = new EventEmitter();
  @Output() name: string;

  calendarOptions: any;
  ics: String;
  icalArray = [];

  constructor(private calendarService: CalendarService) {

    this.name = 'Horaire';

  }

  ngOnInit() {

    this.calendarOptions = {
      contentHeight: '1000', // make a function to adjust ??
      fixedWeekCount: false,
      defaultView: 'agendaDay',
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      minTime: '08:00:00',
      maxTime: '23:00:00',
      titleFormat: 'MMM D, YYYY',
      allDaySlot: false,
      events: this.widget.properties.events
    };
  }

  removeItem(e) {
    this.removed.emit(e);
  }

}
