import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CalendarService} from '../calendar.service';

@Component({
  selector: 'gridster-widget-calendar',
  templateUrl: './widget-calendar.component.html',
  styleUrls: ['./widget-calendar.component.css'],
  providers: [CalendarService]
})


export class WidgetCalendarComponent implements OnInit {
  @Output() removed = new EventEmitter();
  @Output() name: string;
  calendarOptions: Object;
  events: Array<Object>;

  constructor(private CalendarService: CalendarService) {
  }

  ngOnInit() {
    this.CalendarService.getEvents().subscribe(res => {
      if (res && res.events) {
        this.events = res.events;
      }
      else {
        console.log(res);
      }
    }, err => {

    });
    this.name = 'Horaire';

    this.calendarOptions = {
      height: '500', // make a function to adjust ??
      fixedWeekCount: false,
      defaultDate: '2016-09-12',
      defaultView: 'agendaDay',
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      minTime: '08:00:00',
      maxTime: '23:00:00',
      titleFormat: 'MMM D, YYYY',
      allDaySlot: false,
      events: this.events/*[
       {
       id: 999,
       title: 'Repeating Event',
       start: '2016-09-09T16:00:00'
       },
       {
       title: 'Meeting',
       start: '2016-09-12T10:30:00',
       end: '2016-09-12T12:30:00'
       },
       {
       title: 'Click for Google',
       url: 'http://google.com/',
       start: '2016-09-28'
       }
       ]*/
    };
  }

  removeItem(e) {
    this.removed.emit(e);
  }


}
