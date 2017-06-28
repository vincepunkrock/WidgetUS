import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class MeteoService {

  constructor(private http: Http) { }

  getWeather(cityQuery: string, units: string): Observable<any> {
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?q="+ cityQuery +"&appid=f2d3f236b9b8518f948a3fffbe2beb2c&units="+units+"&lang=fr")
    .map((res) => res.json())
    .catch((err)=> Observable.throw(err));
  }

}
