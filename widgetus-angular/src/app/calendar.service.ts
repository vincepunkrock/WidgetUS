import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class CalendarService {

  constructor(private http: Http) {
  }

  getEvents(icalUrl) {
    return this.http.get(icalUrl);
  }
}
