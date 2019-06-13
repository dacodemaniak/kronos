import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-full-event',
  templateUrl: './fullevent.component.html',
  styleUrls: ['./fullevent.component.scss']
})

export class FullEventComponent implements OnInit {
  @Input() event: any;
  @Output() oneMoreContributor: EventEmitter<any> = new EventEmitter<any>();

  public declined: Boolean = false;

  constructor() { }

  public accept(): void {
    this.declined = true;
    this.event.contributors++;
    this.oneMoreContributor.emit(
      {
        event: this.event
      }
    );
  }

  public decline(): void {
    this.declined = true;
  }
  ngOnInit() {
  }

}
