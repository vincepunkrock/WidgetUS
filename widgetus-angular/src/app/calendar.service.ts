import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';

@Injectable()
export class CalendarService {

  constructor(private http: Http) {
  }

  getEvents(): Observable<any> {
    return this.http.get('http://s6ie1709.gel.usherbrooke.ca:8080/widgetus/CalendarServlet?action=getEvents')
      .map((res) => res.json())
      .catch((err) => Observable.throw(err));
  }

}
