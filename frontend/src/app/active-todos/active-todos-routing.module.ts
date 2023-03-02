import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActiveTodosComponent} from "./pages/active-todos.component";

const routes: Routes = [
  {
    path: '',
    component: ActiveTodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveTodosRoutingModule {
}
