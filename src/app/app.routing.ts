import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelToInsertComponent } from './tools/excel-to-insert/excel-to-insert.component';

const routes: Routes = [{
    path: 'excel-to-insert',
    component: ExcelToInsertComponent
  },
  { path: '**', redirectTo: '/excel-to-insert', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
