import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelToInsertComponent } from '@tools/tool-excel-to-insert/tool-excel-to-insert.component';

const routes: Routes = [{
    path: 'tool-excel-to-insert',
    component: ExcelToInsertComponent
  },
  { path: '**', redirectTo: '/tool-excel-to-insert', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
