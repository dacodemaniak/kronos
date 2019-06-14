import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventInterface } from './event-interface';
import { EventsService } from './events.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsResolverService implements Resolve<Map<number, EventInterface>> {

  constructor(private eventsService: EventsService) { }

  public resolve(): Observable<Map<number, EventInterface>> {
    console.log('Resolver in progress');
    return this.eventsService.asObservable();

  }
}
