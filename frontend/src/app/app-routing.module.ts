import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'active-todos',
    title: 'activeToDos.title',
    loadChildren: () =>
      import('./active-todos/active-todos.module').then(
        m => m.ActiveTodosModule
      ),
  },
  {
    path: 'archived-todos',
    title: 'archivedToDos.title',
    loadChildren: () =>
      import('./archived-todos/archived-todos.module').then(
        m => m.ArchivedTodosModule
      ),
  },
  {
    path: '**',
    redirectTo: 'active-todos',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
