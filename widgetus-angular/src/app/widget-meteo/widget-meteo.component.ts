import { Component, OnInit } from '@angular/core';
import { MeteoService } from '../meteo.service';
import { WeatherIcons } from './WeatherIcons';

@Component({
  selector: 'gridster-widget-meteo',
  templateUrl: './widget-meteo.component.html',
  styleUrls: ['./widget-meteo.component.css'],
  providers: [ MeteoService ]
})
export class WidgetMeteoComponent implements OnInit {

  iconName: string = "";
  temp: number;
  cityQuery: string = "Sherbrooke, qc";
  cityResult: string = "";
  desc: string;

  constructor(private meteoService: MeteoService) { }

  ngOnInit() {
    this.loadWeather();
  }

  loadWeather() {
     this.meteoService.getWeather(this.cityQuery, "metric").subscribe(res => {
      if(res){
          this.iconName = this.buildIconName(res.weather[0].id);
          this.temp = res.main.temp;
          this.cityResult = res.name;
          this.desc = res.weather.description;
      }
    }, err => {

    });
  }

  buildIconName(code): string {
    let prefix = 'wi wi-';
    let icon = WeatherIcons.WEATHER_ICONS[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }

    // Finally tack on the prefix.
    icon = prefix + icon;

    return icon;
  }

}
