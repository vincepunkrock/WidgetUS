import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

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
import { WidgetCalendarPopupComponent } from './widget-calendar-popup/widget-calendar-popup.component';
import { HttpModule } from '@angular/http';
import {CalendarComponent} from 'ap-angular2-fullcalendar/src/calendar/calendar';
import { WidgetHeaderComponent } from './widget-header/widget-header.component';
import { WidgetToDoListComponent } from './widget-to-do-list/widget-to-do-list.component';
import { WidgetToDoItemComponent } from './widget-to-do-item/widget-to-do-item.component';
import { WidgetNoteComponent } from './widget-note/widget-note.component';


@NgModule({
  declarations: [
    AppComponent,
    OpusNavbarComponent,
    DashboardTabComponent,
    DashboardTabsComponent,
    WidgetMeteoComponent,
    WidgetCalendarComponent,
    CalendarComponent,
    WidgetHeaderComponent,
    WidgetToDoListComponent,
    WidgetCalendarPopupComponent,
    WidgetToDoItemComponent,
    WidgetNoteComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdIconModule, MdButtonModule, MdSelectModule, MdSliderModule, MdInputModule, MdTooltipModule, MdCheckboxModule,
    GridsterModule,
    HttpModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ WidgetCalendarPopupComponent ]
})
export class AppModule {

}
