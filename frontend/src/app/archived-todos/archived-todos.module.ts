import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivedTodosRoutingModule } from './archived-todos-routing.module';
import { ArchivedTodosComponent } from './pages/archived-todos.component';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { ArchivedTodosTableComponent } from './componenets/archived-todos-table/archived-todos-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    ArchivedTodosComponent,
    ArchivedTodosTableComponent,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    ArchivedTodosRoutingModule,
    MatCardModule,
    TranslateModule,
    MatPaginatorModule,
    MatTableModule,
    SharedModule,
    MatSortModule,
  ],
})
export class ArchivedTodosModule {}
