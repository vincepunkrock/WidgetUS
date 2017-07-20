import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class CalendarService {

  constructor(private http: Http) {
  }

  getEvents() {
    return this.http.get("https://www.gel.usherbrooke.ca/horarius/ical?h=vWGRHK15%2Bi7VZimGYG9dpmBhiMkq4r47ffaa8MrrkKE%3D");
  }
}
