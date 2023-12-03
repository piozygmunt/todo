import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { concatMap, EMPTY } from "rxjs";
import { ToDo } from "../../core/models/todo";
import { moveItemInArray } from "@angular/cdk/drag-drop";
import { MatDialog } from "@angular/material/dialog";
import { TodoFormDialogComponent } from "../components/todo-form-dialog/todo-form-dialog.component";
import { TodosService } from "../../core/services/todos.service";

@Component({
  selector: 'app-active-todos',
  templateUrl: './active-todos.component.html',
  styleUrl: './active-todos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveTodosComponent implements OnInit {
  readonly maxToDosCount = 5;
  toDos: ToDo[] = [];

  private todosService: TodosService = inject(TodosService);
  private dialog: MatDialog = inject(MatDialog);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit() {
    this.getActiveToDos();
  }

  private getActiveToDos(): void {
    this.todosService.getActiveToDos().subscribe((toDos) => this.updateActiveToDos(toDos));
  }

  private updateActiveToDos(toDos: ToDo[]): void {
    this.toDos = toDos || [];
    this.cd.markForCheck();
  }

  onToDosSwapped(dropEvent: any): void {
    const previousIndex = dropEvent.previousIndex;
    const currentIndex = dropEvent.currentIndex;
    const toDoId = this.toDos[previousIndex].id;

    if (!toDoId) {
      return;
    }

    this.todosService.reorderToDo(toDoId, currentIndex).subscribe((toDos) => this.updateActiveToDos(toDos));
    moveItemInArray(this.toDos, previousIndex, currentIndex);
  }

  onToDoResolved(resolvedToDo: ToDo): void {
    const toDoId = resolvedToDo.id;
    if (!toDoId) {
      return;
    }
    this.todosService.resolveToDo(toDoId).subscribe(() => this.getActiveToDos());
  }

  onToDoRemoved(removedToDo: ToDo): void {
    const toDoId = removedToDo.id;
    if (!toDoId) {
      return;
    }
    this.todosService.deleteToDo(toDoId).subscribe(() => this.getActiveToDos());
  }

  openCreateToDoDialog(): void {
    const dialogRef = this.dialog.open(TodoFormDialogComponent);
    dialogRef.afterClosed().pipe(concatMap((toDo) => {
      return toDo ? this.todosService.createToDo(toDo) : EMPTY
    })).subscribe(() => this.getActiveToDos());
  }
}
