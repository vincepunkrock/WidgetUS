import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get('http://10.43.158.122:3306/users')
      .map(res => res.json());
  }

}
