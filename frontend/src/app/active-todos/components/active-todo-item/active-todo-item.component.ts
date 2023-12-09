import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ToDo } from '../../../core/models/todo';

@Component({
  selector: 'app-active-todo-item',
  templateUrl: './active-todo-item.component.html',
  styleUrls: ['./active-todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveTodoItemComponent {
  @Input()
  toDo: ToDo;

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  resolve: EventEmitter<void> = new EventEmitter<void>();
}
