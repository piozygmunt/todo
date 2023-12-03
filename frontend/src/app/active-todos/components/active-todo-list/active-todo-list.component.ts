import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ToDo} from "../../../core/models/todo";

@Component({
  selector: 'app-active-todo-list',
  templateUrl: './active-todo-list.component.html',
  styleUrl: './active-todo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveTodoListComponent {
  @Input()
  toDos: ToDo[] = []

  @Output()
  toDoResolved: EventEmitter<ToDo> = new EventEmitter<ToDo>();

  @Output()
  toDoRemoved: EventEmitter<ToDo> = new EventEmitter<ToDo>();

  @Output()
  toDosSwapped: EventEmitter<any> = new EventEmitter<any>();

  dropActiveToDo(dropEvent: any): void {
    if(dropEvent.previousIndex === dropEvent.currentIndex) {
      return
    }

    this.toDosSwapped.emit(dropEvent);
  }

  getDoIdentity(index: any, item: ToDo): string | undefined {
    return item.id;
  }
}
