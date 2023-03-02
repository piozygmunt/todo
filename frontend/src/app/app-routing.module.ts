import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'active-todos',
    title: 'activeToDos.title',
    loadChildren: () => import('./active-todos/active-todos.module').then((m) => m.ActiveTodosModule)
  },
  {
    path: '**',
    redirectTo: 'active-todos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
