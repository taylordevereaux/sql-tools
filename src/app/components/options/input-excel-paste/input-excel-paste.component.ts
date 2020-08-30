import {Component, Inject, EventEmitter, Output, AfterContentInit, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface InputExcelPasteResult {
  content: string;
  contentHasHeader: boolean;
}
@Component({
  selector: 'app-input-excel-paste',
  templateUrl: './input-excel-paste.component.html',
  styleUrls: ['./input-excel-paste.component.scss']
})
export class InputExcelPasteComponent  {
  @Input() content = '';
  @Output() contentPasted = new EventEmitter<InputExcelPasteResult>();

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(InputExcelPasteDialogComponent, {
      width: 'calc(100% - 200px)',
      data: this.content
    });

    dialogRef.afterClosed().subscribe((result: InputExcelPasteResult) => {
      if (result !== undefined && result !== null && result.content !== '') { 
        this.contentPasted.emit(result);
      }
    });
  }
}

@Component({
  selector: 'app-input-excel-paste-dialog',
  templateUrl: './input-excel-paste-dialog.component.html'
})
export class InputExcelPasteDialogComponent implements AfterContentInit {
  public contentHasHeader = false;

  constructor(
    public dialogRef: MatDialogRef<InputExcelPasteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public content: string
  ) {
  }

  ngAfterContentInit(): void {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.readText()
        .then(text => this.content = text)
        .catch(error => console.log('Failed to read clipboard: ', error))
        .finally();
    }
  }

  public getResult(): InputExcelPasteResult {
    return {
      content: this.content,
      contentHasHeader: this.contentHasHeader
    } as InputExcelPasteResult;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onKeydown(e): void {
    if (e.keyCode === 9) { // tab was pressed
      // Prevent the default event from happening.
      e.preventDefault();
      // Get the current target.
      const target = e.target;
      // get caret position/selection
      const val = target.value;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      // set textarea value to: text before caret + tab + text after caret
      target.value = val.substring(0, start) + '\t' + val.substring(end);
      // put caret at right position again
      target.selectionStart = target.selectionEnd = start + 1;
    }
  }
}
