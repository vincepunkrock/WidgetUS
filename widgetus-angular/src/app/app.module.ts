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

@NgModule({
  declarations: [
    AppComponent,
    OpusNavbarComponent,
    DashboardTabComponent,
    DashboardTabsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdIconModule, MdButtonModule, MdSelectModule, MdSliderModule, MdInputModule, MdTooltipModule, MdCheckboxModule,
    GridsterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
