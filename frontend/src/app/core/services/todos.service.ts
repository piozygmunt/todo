import {Injectable, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ToDo} from "../models/todo";
import {ArchivedTodosQuery} from "../models/archived-todos-query";
import {ArchivedTodosResponse} from "../models/archived-todos-response";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private http: HttpClient = inject(HttpClient);

  getActiveToDos(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.createApiUrl("todos/active"), {responseType: "json"});
  }

  createToDo(toDo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.createApiUrl("todos"), toDo, {responseType: "json"})
  }

  reorderToDo(toDoId: string | undefined, position: number): Observable<ToDo[]> {
    return this.http.post<ToDo[]>(this.createApiUrl(`todos/${toDoId}/reorder/${position}`), {}, {responseType: "json"});
  }

  resolveToDo(toDoId: string): Observable<ToDo> {
    return this.http.post<ToDo>(this.createApiUrl(`todos/${toDoId}/resolve`), {}, {responseType: "json"});
  }

  deleteToDo(toDoId: string): Observable<void> {
    return this.http.delete<void>(this.createApiUrl(`todos/${toDoId}`));
  }

  getArchivedToDos(archivedToDoQuery: ArchivedTodosQuery): Observable<ArchivedTodosResponse> {
    return this.http.post<ArchivedTodosResponse>(this.createApiUrl("todos/archived"), archivedToDoQuery, {responseType: "json"});
  }

  private createApiUrl(path: string): string {
    return `${environment.apiUrl}/${path}`
  }
}
