import { ArchivedToDo } from './archived-todo';

export interface ArchivedTodosResponse {
  archivedToDos: ArchivedToDo[];
  currentPage: number;
  numberOfPages: number;
  toDosCount: number;
}
