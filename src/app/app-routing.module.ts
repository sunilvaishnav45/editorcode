import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenusModule } from './menus/menus.module';

const routes: Routes = [
  {
    path : "",
    pathMatch : "full",
    redirectTo:"all"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
