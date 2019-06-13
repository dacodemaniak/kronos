import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../../../core/authentication/authentication.service';

import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public title: String = 'kronos';

  public eventsMap: Map<number, any> = new Map<number, any>();

  public selectedEvent: any = null;
  public today: moment.Moment = moment();

  public readonly maxContributor: number = 8;

  public constructor(authenticationService: AuthenticationService) {}

  public ngOnInit(): void {
    this.eventsMap.set(1, {
      id: 1,
      title: 'Nouvel événement',
      beginAt: moment('2019-06-15 09:00'),
      endAt: moment('2019-06-15 11:00'),
      contributors: 0,
      detail: 'Détail du nouvel événement...',
      timeRemaining: ''
    })
    .set(2, {
      id: 2,
      title: 'Pasted event',
      beginAt: moment('2019-06-10 09:00'),
      endAt: moment('2019-06-10 11:00'),
      contributors: 1,
      detail: 'Plus d\'informations concernant l’événement passé',
      timeRemaining: ''
    })
    .set(3, {
      id: 3,
      title: 'Future event',
      beginAt: moment('2019-06-12 09:00'),
      endAt: moment('2019-06-12 11:00'),
      contributors: 5,
      detail: 'Encore pas mal de chose à venir dans le futur',
      timeRemaining: ''
    });
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
