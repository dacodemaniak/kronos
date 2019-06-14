import { EventsService } from './../../shared/events.service';
import { EventInterface } from './../../shared/event-interface';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  public event: EventInterface;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private eventsService: EventsService) {

  }

  ngOnInit() {
    this._activatedRoute.params
    .pipe(
      switchMap((params: ParamMap) => this.eventsService.getEvent(+params['eventId']))
    )
    .subscribe((event: EventInterface) => {
      console.log('Observable emitted : ' + JSON.stringify(event));
      this.event = event;
    });
  }

}
