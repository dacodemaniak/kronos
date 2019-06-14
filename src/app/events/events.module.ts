import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './page/events/events.component';
import { FullEventComponent } from './components/full-event/fullevent/fullevent.component';
import { MomentModule } from 'ngx-moment';
import { ContributorsPipe } from './pipes/contributors.pipe';
import { CountDownPipe } from './pipes/count-down.pipe';
import { ShowDetailDirective } from './directives/show-detail.directive';
import { EventDetailComponent } from './page/event-detail/event-detail.component';
import { ActivatedRoute } from '@angular/router';


@NgModule({
  declarations: [
    EventsComponent,
    FullEventComponent,
    ContributorsPipe,
    CountDownPipe,
    ShowDetailDirective,
    EventDetailComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MomentModule
  ],
  exports: [
    EventsComponent,
    EventDetailComponent
  ],
  providers: []
})
export class EventsModule { }
