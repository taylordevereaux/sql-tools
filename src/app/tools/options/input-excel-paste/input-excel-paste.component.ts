import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-input-excel-paste',
  templateUrl: './input-excel-paste.component.html',
  styleUrls: ['./input-excel-paste.component.scss']
})
export class InputExcelPasteComponent  {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(InputExcelPasteDialogComponent, {
      width: 'calc(100% - 200px)',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
