import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';

import * as moment from 'moment';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { of, timer } from 'rxjs/index';
import { repeatWhen, takeWhile, mergeMap, map } from 'rxjs/operators';

@Pipe({
  name: 'countDown',
  pure: false
})
export class CountDownPipe implements PipeTransform, OnDestroy {
  private readonly async: AsyncPipe;

  private isDestroyed: Boolean = false;
  private value: moment.Moment;
  private timer: Observable<string>;

  public constructor(ref: ChangeDetectorRef) {
    this.async = new AsyncPipe(ref);
  }

  transform(beginAt: string): string {
    const checkDate: moment.Moment = moment(beginAt);

    if (!checkDate.isValid()) {
      throw new Error(
        'This pipe requires a well string date to run !'
      );
    }

    this.value = checkDate.clone();

    if (!this.timer) {
      this.timer = this.getObservable();
    }

    return this.async.transform(this.timer);

  }

  public ngOnDestroy(): void {
    this.isDestroyed = true;
  }

  private getObservable(): any {
    return of(1).pipe(
      repeatWhen((notifications) => {
        return notifications.pipe(
          mergeMap((x, i) => {
            const sleep = i < 60 ? 1000 : 60000;
            return timer(sleep);
          })
        )
      }),
      takeWhile(_ => !this.isDestroyed),
      map((x, i) => this.elapsed())
    );
  }

  private elapsed(): string {
    const now: moment.Moment = moment();

    if (this.value.isBefore(now)) {
      return 'Trop tard...';
    }

    const delta: number = this.value.diff(now, 's');

    if (delta < 60) {
      return delta + ' secondes';
    } else if (delta < 3600) {
      return Math.floor(delta / 60) + ' minutes';
    } else if (delta < 84600) {
      return Math.floor(delta / 3600) + ' heures';
    } else {
      return Math.floor(delta / 86400) + ' jours';
    }
  }
}
