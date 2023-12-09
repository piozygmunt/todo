import { Pipe, PipeTransform } from '@angular/core';
import { ArchivedToDo, ToDoStatus } from '../../core/models/archived-todo';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  async transform(archivedToDo: ArchivedToDo): Promise<string> {
    const dateTo = new Date();
    let dateFrom;
    let translationKey: string;

    switch (archivedToDo.status) {
      case ToDoStatus.EXPIRED:
        translationKey = 'archivedToDos.expiredAgo';
        dateFrom = archivedToDo.expiredDate;
        break;
      case ToDoStatus.RESOLVED:
        translationKey = 'archivedToDos.resolvedAgo';
        dateFrom = archivedToDo.resolvedDate;
        break;
    }

    const timeAgo = await this.calculateTimeAgo(dateFrom, dateTo);
    return timeAgo.trim()
      ? this.translateService.instant(translationKey, { value: timeAgo })
      : this.translateService.instant('archivedToDos.resolvedJustNow');
  }

  async calculateTimeAgo(
    dateFrom: Date | string,
    dateTo: Date | string
  ): Promise<string> {
    // @ts-ignore
    const { default: moment } = await import('moment');

    const dateFromM = moment(dateFrom);
    const dateToM = moment(dateTo);

    const duration = moment.duration(dateToM.diff(dateFromM));

    return this.formatDuration(duration);
  }

  private formatDuration(duration: any): string {
    let months = duration.get('M');
    months = months > 0 ? `${months}[M]` : '';

    let days = duration.get('d');
    days = days > 0 ? `${days}[d]` : '';

    let hours = duration.get('h');
    hours = hours > 0 ? `${hours}[h]` : '';

    let minutes = duration.get('m');
    minutes = minutes > 0 ? `${minutes}[m]` : '';

    let seconds = duration.get('s');
    seconds = seconds > 0 ? `${seconds}[s]` : '';

    return `${months} ${days} ${hours} ${minutes} ${seconds}`;
  }
}
