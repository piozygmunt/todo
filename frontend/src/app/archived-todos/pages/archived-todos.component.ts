import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodosService } from '../../core/services/todos.service';
import { ArchivedTodosQuery } from '../../core/models/archived-todos-query';
import { Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-archived-todos',
  templateUrl: './archived-todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchivedTodosComponent {
  private archivedToDosQueryChange: Subject<ArchivedTodosQuery> =
    new Subject<ArchivedTodosQuery>();
  private archivedToDosQueryChange$: Observable<ArchivedTodosQuery> =
    this.archivedToDosQueryChange.asObservable();

  archivedToDosResponse$ = this.archivedToDosQueryChange$.pipe(
    switchMap(query => this.toDosService.getArchivedToDos(query))
  );

  constructor(private toDosService: TodosService) {}

  onSortPageChange(archivedToDosQuery: ArchivedTodosQuery): void {
    this.archivedToDosQueryChange.next(archivedToDosQuery);
  }
}
