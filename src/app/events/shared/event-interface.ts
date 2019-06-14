import * as moment from 'moment';

export interface EventInterface {
  id: number;
  title: string;
  beginAt: moment.Moment;
  endAt: moment.Moment;
  contributors: number;
  detail: string;
}
