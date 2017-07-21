import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'gridster-widget-custom',
  templateUrl: './widget-custom.component.html',
  styleUrls: ['./widget-custom.component.css']
})
export class WidgetCustomComponent implements OnInit {

  @Output() removed = new EventEmitter();
  @Output() name: string;
  @Input() widget;

  url: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.name = 'Custom';
    // this.url = "https://www.gel.usherbrooke.ca/horarius/";
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.gel.usherbrooke.ca/horarius/');
  }

  removeItem(e) {
    this.removed.emit(e);
  }
}
