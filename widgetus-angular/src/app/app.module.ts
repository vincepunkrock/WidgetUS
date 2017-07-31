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
import { HttpModule } from '@angular/http';
import { WidgetHeaderComponent } from './widget-header/widget-header.component';
import { WidgetToDoListComponent } from './widget-to-do-list/widget-to-do-list.component';
import { WidgetToDoItemComponent } from './widget-to-do-item/widget-to-do-item.component';
import { WidgetNoteComponent } from './widget-note/widget-note.component';
import { WidgetCustomComponent } from './widget-custom/widget-custom.component';


@NgModule({
  declarations: [
    AppComponent,
    OpusNavbarComponent,
    DashboardTabComponent,
    DashboardTabsComponent,
    WidgetMeteoComponent,
    WidgetHeaderComponent,
    WidgetToDoListComponent,
    WidgetToDoItemComponent,
    WidgetNoteComponent,
    WidgetCustomComponent

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
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {

}
