import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from  '@angular/material/input';
import { MatSlideToggleModule } from  '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';

// Custom Components
import { ToolsComponent } from '@tools/tools.component';
import { ExcelToInsertComponent } from '@tools/tool-excel-to-insert/tool-excel-to-insert.component';
import { InputExcelPasteComponent, InputExcelPasteDialogComponent } from '@options/input-excel-paste/input-excel-paste.component';
import { OptionItemComponent } from '@options/option-item/option-item.component';
import { OptionItemHeaderComponent } from '@options/option-item/option-item-header/option-item-header.component';
import { OptionItemContentComponent } from '@options/option-item/option-item-content/option-item-content.component';
import { ToolContainerComponent } from '@components/tool-container/tool-container.component';
import { ToolOptionsComponent } from '@components/tool-container/tool-options/tool-options.component';
import { ToolOutputComponent } from '@components/tool-container/tool-output/tool-output.component';

import { ToolsStore } from '@tools/tools.store';
import { ToolExcelToInsertStore } from '@tools/tool-excel-to-insert/tool-excel-to-insert.store'; 
import { ExcelParserService } from '@services/excel-parser.service';


@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent,
    ExcelToInsertComponent,
    InputExcelPasteComponent,
    InputExcelPasteDialogComponent,
    OptionItemComponent,
    OptionItemHeaderComponent,
    OptionItemContentComponent,
    ToolContainerComponent,
    ToolOptionsComponent,
    ToolOutputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    // Material Controls
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    ClipboardModule,
    
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    ToolsStore,
    ToolExcelToInsertStore,
    ExcelParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
