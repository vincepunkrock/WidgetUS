import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {

  constructor(private http: Http) { }

  getAuthenticatedUser(): Observable<any> {
    return this.http.get("http://s6ie1709.gel.usherbrooke.ca:8080/widgetus/HomeServlet?action=getUserInfos")
    .map((res) => res.json())
    .catch((err) => Observable.throw(err));
  }

}
