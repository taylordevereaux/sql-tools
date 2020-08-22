import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Material Controls
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

// Custom Components
import { ToolsComponent } from './tools/tools.component';
import { ExcelToInsertComponent } from './tools/excel-to-insert/excel-to-insert.component';
import { InputExcelPasteComponent } from './tools/options/input-excel-paste/input-excel-paste.component';

import { ToolsStore } from './tools/tools.store';

@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent,
    ExcelToInsertComponent,
    InputExcelPasteComponent
  ],
  imports: [
    BrowserModule,
    // Material Controls
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ToolsStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
