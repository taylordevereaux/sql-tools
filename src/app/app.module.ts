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
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from  '@angular/material/input';
import { MatCheckboxModule } from  '@angular/material/checkbox';
import { MatSelectModule } from  '@angular/material/select';
import { MatSlideToggleModule } from  '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';

// Custom Components
import { ToolsComponent } from '@tools/tools.component';
import { ExcelToInsertComponent } from '@tools/tool-excel-to-insert/tool-excel-to-insert.component';
import { InputExcelPasteComponent, InputExcelPasteDialogComponent } from '@components/options/input-excel-paste/input-excel-paste.component';
import { OptionItemComponent } from '@components/option-item/option-item.component';
import { OptionItemHeaderComponent } from '@components/option-item/option-item-header/option-item-header.component';
import { OptionItemContentComponent } from '@components/option-item/option-item-content/option-item-content.component';
import { ToolContainerComponent } from '@components/tool-container/tool-container.component';
import { ToolOptionsComponent } from '@components/tool-container/tool-options/tool-options.component';
import { ToolOutputComponent } from '@components/tool-container/tool-output/tool-output.component';
import { ColumnFormatPipe } from '@pipes/column-format.pipe';

import { ToolsStore } from '@tools/tools.store';
import { ToolExcelToInsertStore } from '@tools/tool-excel-to-insert/tool-excel-to-insert.store';
import { ExcelParserService } from '@services/excel-parser.service';
import { ToolPasteToInClauseStore } from './tools/tool-paste-to-in-clause/tool-paste-to-in-clause.store';
import { ToolPasteToInClauseComponent } from './tools/tool-paste-to-in-clause/tool-paste-to-in-clause.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolsComponent,
    ExcelToInsertComponent,
    ToolPasteToInClauseComponent,
    InputExcelPasteComponent,
    InputExcelPasteDialogComponent,
    OptionItemComponent,
    OptionItemHeaderComponent,
    OptionItemContentComponent,
    ToolContainerComponent,
    ToolOptionsComponent,
    ToolOutputComponent,
    ColumnFormatPipe
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
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    ClipboardModule,
    MatTableModule,
    
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    ToolsStore,
    ToolExcelToInsertStore,
    ToolPasteToInClauseStore,
    ExcelParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
