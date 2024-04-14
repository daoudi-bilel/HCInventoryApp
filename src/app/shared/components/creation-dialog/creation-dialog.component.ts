import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Device } from '@appModels/device';
import { Employee } from '@appModels/employee';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss']
})
export class CreationDialogComponent implements OnInit {
  
  @Input() title!: string;
  @Input() isEdit: boolean = false;
  
  @Output() updatedID: EventEmitter<number> = new EventEmitter<number>();
  @Output() deletedID: EventEmitter<number> = new EventEmitter<number>();
  @Output() handleSave: EventEmitter<boolean> = new EventEmitter<boolean>();



  constructor(
    public dialogRef: MatDialogRef<CreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee | Device,
    private dialog: MatDialog
 ) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
      this.dialogRef.close();
  }

  onSave(){
    debugger
      if(this.isEdit)
       this.updatedID.emit(this.data.id);
      else
       this.handleSave.emit(true);
  }
  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this employee?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }
   });
  
   dialogRef.afterClosed().subscribe(result => {
      if (result === 'Yes') {
        this.deletedID.emit(this.data.id);
        this.dialogRef.close();
      }
   });
 }

}
