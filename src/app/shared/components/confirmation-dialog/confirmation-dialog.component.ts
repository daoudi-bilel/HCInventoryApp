import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
 ) {}

   @Output() emittedID: EventEmitter<any> = new EventEmitter<any>();

 onNoClick(): void {
    this.dialogRef.close();
 }
 ngOnInit(): void {
     
 }
 onConfirm(){
  this.emittedID.emit(this.data.id);
 }
}
