import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as _ from 'underscore';

@Component({
  selector: 'gridster-widget-custom',
  templateUrl: './widget-custom.component.html',
  styleUrls: ['./widget-custom.component.css']
})
export class WidgetCustomComponent implements OnInit {

  @Output() removed = new EventEmitter();
  @Output() name: string;
  @Input() widget;

  tmp_url;
  url: SafeResourceUrl;
  urlOk;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.name = 'Custom';
    // this.tmp_url = 'https://drive.google.com/embeddedfolderview?id=0B7R2gk2Et7gCdks3R1g2Q1ZDWjg#list';
    // this.tmp_url = 'https://www.gel.usherbrooke.ca/s6info/e17/doc/app5/';
    // this.tmp_url = '';
    this.urlOk = !_.isEmpty(this.tmp_url);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.tmp_url);
  }

  removeItem(e) {
    this.removed.emit(e);
  }

  updateUrl() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.tmp_url);
    this.urlOk = !_.isEmpty(this.tmp_url);
  }
}
