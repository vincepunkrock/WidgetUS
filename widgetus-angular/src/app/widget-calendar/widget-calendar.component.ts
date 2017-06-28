import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'gridster-widget-calendar',
  templateUrl: './widget-calendar.component.html',
  styleUrls: ['./widget-calendar.component.css']
})


export class WidgetCalendarComponent implements OnInit {
  calendarOptions: Object;

  constructor() {
  }

  ngOnInit() {
    this.calendarOptions = {
      height: 'auto', // make a function to adjust ??
      fixedWeekCount: false,
      defaultDate: '2016-09-12',
      defaultView: 'agendaDay',
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2016-09-01'
        },
        {
          title: 'Long Event',
          start: '2016-09-07',
          end: '2016-09-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-09-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2016-09-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2017-06-27T03:30:00',
          end: '2017-06-27T14:30:00'
        },
        {
          title: 'Meeting',
          start: '2016-09-12T10:30:00',
          end: '2016-09-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2016-09-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2016-09-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2016-09-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2016-09-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2016-09-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2016-09-28'
        }
      ]
    };
  }


}
