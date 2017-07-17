import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get('http://10.43.158.122:3306/users')
      .map(res => res.json());
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  getUserFromDB(cip) {
    return this.http.get('http://10.43.158.122:3306/users?cip=eq.' + cip)
      .map(res => res.json());
  }

  getDashboards() {
    return this.http.get('http://10.43.158.122:3306/dashboard_widget_list?cip=eq.' + this.getUser().cip)
      .map(res => res.json());
  }

  postDashboard(dashboardName) {
    let json = {'cip': this.getUser().cip, 'dashboard_name': dashboardName};
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=representation'});

    return this.http.post('http://10.43.158.122:3306/dashboard', json, {headers: headers})
      .map(res => res.json());
  }

  deleteDashboard(dashboard_id) {
    // let json = {'dashboard_id': dashboard_id};
    // let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=representation'});
    // let url = 'http://10.43.158.122:3306/dashboard=eq.' + dashboard_id;
    return this.http.delete('http://10.43.158.122:3306/dashboard?dashboard_id=eq.' + dashboard_id)
    // return this.http.post('http://10.43.158.122:3306/dashboard', json, {headers: headers})
      .map(res => res.json());
  }


  postWidget(widgetConfig) {
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=minimal'});

    return this.http.post('http://10.43.158.122:3306/widget_list', widgetConfig, {headers: headers})
      .map(res => res.json());
  }

  postNewUser(cip) {
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=representation'});
    let json = {'cip': cip};
    return this.http.post('http://10.43.158.122:3306/users', json, {headers: headers})
      .map(res => res.json());
  }
}
