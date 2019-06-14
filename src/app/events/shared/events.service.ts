import { Injectable } from '@angular/core';
import { EventInterface } from './event-interface';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { of } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: Map<number, EventInterface> = new Map<number, EventInterface>();

  constructor() {}

  public get(): Promise<Map<number, EventInterface>> {
    if (this.events.size) {
      return new Promise<Map<number, EventInterface>>((resolve) => {resolve(this.events);});
    } else {
      return new Promise<Map<number, EventInterface>>((resolve) => {
        this._hydrate();
        resolve(this.events);
      });
    }
  }

  public asObservable(): Observable<Map<number, EventInterface>> {
    if (this.events.size) {
      return of(this.events);
    } else {
      this._hydrate();
      console.log('Events are : ' + this.events.size);
      return of(this.events);
    }
  }

  public getEvent(eventId: number): Promise<EventInterface> {
    return new Promise((resolve) => {
      this.get().then((events: Map<number, EventInterface>) => {
        const event: EventInterface = this.events.get(eventId);
        resolve(event);
      });
    });
  }

  private _hydrate(): void {
    this.events.set(1, {
      id: 1,
      title: 'Nouvel événement',
      beginAt: moment('2019-06-15 09:00'),
      endAt: moment('2019-06-15 11:00'),
      contributors: 0,
      detail: 'Détail du nouvel événement...'
    })
    .set(2, {
      id: 2,
      title: 'Pasted event',
      beginAt: moment('2019-06-10 09:00'),
      endAt: moment('2019-06-10 11:00'),
      contributors: 1,
      detail: 'Plus d\'informations concernant l’événement passé'
    })
    .set(3, {
      id: 3,
      title: 'Future event',
      beginAt: moment('2019-06-12 09:00'),
      endAt: moment('2019-06-12 11:00'),
      contributors: 5,
      detail: 'Encore pas mal de chose à venir dans le futur'
    });

  }
}
