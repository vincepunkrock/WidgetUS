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

  postToDoTask(widget_list_id, ToDo, row_id) {
    let json = {'widget_list_id':widget_list_id, 'row_value': ToDo, 'row_id': row_id};
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=representation'});

    return this.http.post('http://10.43.158.122:3306/widgetlist_widgetkey', json, {headers: headers})
      .map(res => res.json());
  }

  deleteToDoTask(widget_list_id2) {
    return this.http.delete('http://10.43.158.122:3306/widgetlist_widgetkey?widget_list_id2=eq.' + widget_list_id2)
      .map(res => res.json());
  }

  postDashboard(dashboardName) {
    let json = {'cip': this.getUser().cip, 'dashboard_name': dashboardName};
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=representation'});

    return this.http.post('http://10.43.158.122:3306/dashboard', json, {headers: headers})
      .map(res => res.json());
  }

  deleteDashboard(dashboard_id) {
    return this.http.delete('http://10.43.158.122:3306/dashboard?dashboard_id=eq.' + dashboard_id)
      .map(res => res.json());
  }


  postWidget(widgetConfig) {
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=minimal'});

    return this.http.post('http://10.43.158.122:3306/widget_list', widgetConfig, {headers: headers})
      .map(res => res.json());
  }

  deleteWidget(widget_id) {
    return this.http.delete('http://10.43.158.122:3306/widget_list?widget_list_id=eq.' + widget_id)
      .map(res => res.json());
  }

  postNewUser(cip) {
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=representation'});
    let json = {'cip': cip};
    return this.http.post('http://10.43.158.122:3306/users', json, {headers: headers})
      .map(res => res.json());
  }

  updateWidget(widgetConfig, widget_id) {
    let headers = new Headers({'Content-Type': 'application/json', 'Prefer': 'return=minimal'});

    return this.http.patch('http://10.43.158.122:3306/widget_list?widget_list_id=eq.' + widget_id, widgetConfig, {headers: headers})
      .map(res => res.json());
  }

}
