import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ArchivedTodosQuery,
  Direction,
  SortBy,
} from '../../../core/models/archived-todos-query';
import { ArchivedTodosResponse } from '../../../core/models/archived-todos-response';
import { ArchivedToDo, ToDoStatus } from '../../../core/models/archived-todo';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, startWith } from 'rxjs';

@Component({
  selector: 'app-archived-todos-table',
  templateUrl: './archived-todos-table.component.html',
  styleUrls: ['./archived-todos-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchivedTodosTableComponent implements AfterViewInit {
  readonly displayedColumns = ['description', 'creationDate', 'status'];
  readonly pageSizeOptions = [5, 10];
  readonly ToDoStatus = ToDoStatus;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  archivedToDosResponse: ArchivedTodosResponse | null;

  @Output()
  sortPageChange: EventEmitter<ArchivedTodosQuery> =
    new EventEmitter<ArchivedTodosQuery>();

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(startWith(null))
      .subscribe(() => {
        this.sortPageChange.emit({
          sortBy: this.getSortBy(this.sort.active),
          direction: this.getSortDirection(this.sort.direction),
          pageSize: this.paginator.pageSize,
          requestedPage: this.paginator.pageIndex,
        });
      });
  }

  private getSortDirection(
    sortDirection: SortDirection
  ): Direction | undefined {
    switch (sortDirection) {
      case 'asc':
        return Direction.ASC;
      case 'desc':
        return Direction.DESC;
      default:
        return undefined;
    }
  }

  private getSortBy(activeSort: string): SortBy | undefined {
    switch (activeSort) {
      case 'description':
        return SortBy.DESCRIPTION;
      case 'creationDate':
        return SortBy.CREATION_DATE;
      case 'status':
        return SortBy.STATUS;
      default:
        return undefined;
    }
  }

  getArchivedDoIdentity(index: any, item: ArchivedToDo): string | undefined {
    return item.id;
  }
}
