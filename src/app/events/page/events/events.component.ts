import { ActivatedRoute, Data } from '@angular/router';
import { EventsService } from './../../shared/events.service';
import { EventInterface } from './../../shared/event-interface';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './../../../core/authentication/authentication.service';

import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public title: String = 'kronos';

  public eventsMap: Map<number, EventInterface> = new Map<number, any>();

  public selectedEvent: any = null;
  public today: moment.Moment = moment();

  public readonly maxContributor: number = 8;

  public constructor(
    private authenticationService: AuthenticationService,
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    console.log('Component onInit method');
    this.activatedRoute.data
      .pipe(
        map((data: Data) =>
          data.events
        )
      )
      .subscribe(
          (events: Map<number, EventInterface>) => {
            console.log('Hi events resolved ' + events.size);
            this.eventsMap = events;
          },
          (error: any) => {
            console.log('Something went wrong in the events subscription');
          }
      );
  }

  public addOneContributor(event: any): void {}

  public evalDisponibilities(contributors: number): string {
    const remaining: number = this.maxContributor - contributors;

    switch (remaining) {
      case 0:
        return '-1';
      break;
      case 1:
      case 2:
        return '0';
      break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return '1';
      break;
      case this.maxContributor:
        return '2';
      break;
    }
  }

}
