import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import 'hammerjs';
import {
  MdIconModule,
  MdButtonModule,
  MdSelectModule,
  MdSliderModule,
  MdInputModule,
  MdTooltipModule,
  MdCheckboxModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {GridsterModule} from '../lib/gridster.module';
import { OpusNavbarComponent } from './opus-navbar/opus-navbar.component';
import { DashboardTabComponent } from './dashboard-tab/dashboard-tab.component';
import { DashboardTabsComponent } from './dashboard-tabs/dashboard-tabs.component';
import { WidgetMeteoComponent } from './widget-meteo/widget-meteo.component';
import { WidgetCalendarComponent } from './widget-calendar/widget-calendar.component';
import { HttpModule } from '@angular/http';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';

@NgModule({
  declarations: [
    AppComponent,
    OpusNavbarComponent,
    DashboardTabComponent,
    DashboardTabsComponent,
    WidgetMeteoComponent,
    WidgetCalendarComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdIconModule, MdButtonModule, MdSelectModule, MdSliderModule, MdInputModule, MdTooltipModule, MdCheckboxModule,
    GridsterModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
