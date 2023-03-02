import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActiveTodosRoutingModule} from './active-todos-routing.module';
import {ActiveTodosComponent} from './pages/active-todos.component';
import {ActiveTodoItemComponent} from './components/active-todo-item/active-todo-item.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule} from "@angular/material/card";
import {ActiveTodoListComponent} from './components/active-todo-list/active-todo-list.component';
import {SharedModule} from "../shared/shared.module";
import {TodoFormDialogComponent} from './components/todo-form-dialog/todo-form-dialog.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    ActiveTodosComponent,
    ActiveTodoItemComponent,
    ActiveTodoListComponent,
    TodoFormDialogComponent
  ],
  imports: [
    CommonModule,
    ActiveTodosRoutingModule,
    MatIconModule,
    MatTableModule,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    CdkDragHandle,
    TranslateModule,
    MatCardModule,
    SharedModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class ActiveTodosModule {
}
