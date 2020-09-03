import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelToInsertComponent } from '@tools/tool-excel-to-insert/tool-excel-to-insert.component';
import { ToolPasteToInClauseComponent } from '@tools/tool-paste-to-in-clause/tool-paste-to-in-clause.component';

const routes: Routes = [{
    path: 'tool-excel-to-insert',
    component: ExcelToInsertComponent
  },
  {
    path: 'tool-paste-to-in-clause',
    component: ToolPasteToInClauseComponent
  },
  { path: '**', redirectTo: '/tool-excel-to-insert', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
