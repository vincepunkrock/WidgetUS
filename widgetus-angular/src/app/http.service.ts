import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) { }

  getUsers() {
    return this.http.get('http://10.43.158.122:3306/users')
      .map(res => res.json());
  }

  getDashboards() {
    return this.http.get('http://10.43.158.122:3306/dashboard_widget_list?cip=eq.balp2101')
      .map(res => res.json());
  }

  postDashboard(dashboardName) {
    let json = {'cip': 'balp2101', 'dashboard_name': dashboardName};
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=representation'});

    return this.http.post('http://10.43.158.122:3306/dashboard', json, {headers: headers})
      .map(res => res.json());
  }

  postWidget(widgetConfig) {
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=minimal'});

    return this.http.post('http://10.43.158.122:3306/widget_list', widgetConfig, {headers: headers})
      .map(res => res.json());
  }

}
