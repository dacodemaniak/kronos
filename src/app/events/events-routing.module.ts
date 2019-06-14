import { EventsResolverService } from './shared/events-resolver.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { EventDetailComponent } from './page/event-detail/event-detail.component';
import { EventsComponent } from './page/events/events.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    resolve: {
      events: EventsResolverService
    }
  },
  {
    path: 'event/:eventId',
    component: EventDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'events'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
