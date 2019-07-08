import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './all/all.component';
import { BoardComponent } from './board/board.component';
import { CommonrightpanelComponent } from './commonrightpanel/commonrightpanel.component';
import { GraphComponent } from './graph/graph.component';
import { RecentComponent } from './recent/recent.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [{
  path : "all",
  component : AllComponent,
  children :[{
    path :"content/we",
    component :EditorComponent
  },
  {
    path :"content/woe",
    component :CommonrightpanelComponent
  }]
},
{
  path : "board",
  component : BoardComponent,
},
{
  path : "graph",
  component : GraphComponent,
},
{
  path : "recent",
  component : RecentComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }
