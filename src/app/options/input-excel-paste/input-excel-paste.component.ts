import {Component, Inject, EventEmitter, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-input-excel-paste',
  templateUrl: './input-excel-paste.component.html',
  styleUrls: ['./input-excel-paste.component.scss']
})
export class InputExcelPasteComponent  {
  @Output() contentPasted = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(InputExcelPasteDialogComponent, {
      width: 'calc(100% - 200px)',
      data: ''
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.contentPasted.emit(result);
    });
  }
}


@Component({
  selector: 'app-input-excel-paste-dialog',
  templateUrl: './input-excel-paste-dialog.component.html'
})
export class InputExcelPasteDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<InputExcelPasteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

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

  onFocus(e): void {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.readText()
        .then(text => this.data = text)
        .catch(error => console.log('Failed to read clipboard: ', error));
    }
  }
}
