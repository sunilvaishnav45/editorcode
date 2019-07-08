import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenusRoutingModule } from './menus-routing.module';
import { AllComponent } from './all/all.component';
import { BoardComponent } from './board/board.component';
import { CommonrightpanelComponent } from './commonrightpanel/commonrightpanel.component';
import { GraphComponent } from './graph/graph.component';
import { RecentComponent } from './recent/recent.component';
import { TooltipModule, ModalModule, CollapseModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './editor/editor.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    AllComponent,  
    BoardComponent, CommonrightpanelComponent, 
    GraphComponent, RecentComponent, EditorComponent
  ],
  imports: [
    CommonModule,
    MenusRoutingModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot()
  ] 
})
export class MenusModule { }
