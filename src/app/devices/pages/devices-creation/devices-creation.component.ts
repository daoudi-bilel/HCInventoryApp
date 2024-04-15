import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '@appModels/device';
import { createDevice, deleteDevice, fetchDeviceByID, updateDevice } from '@appState/devices/device.actions';
import { DeviceState } from '@appState/devices/device.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-devices-creation',
  templateUrl: './devices-creation.component.html',
  styleUrls: ['./devices-creation.component.scss']
})
export class DevicesCreationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DevicesCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private store: Store<{ device: DeviceState}>,
    private snackBar: MatSnackBar

 ) {}

 deviceID!: number;
 isEdit: boolean = false;
 deviceForm = new FormGroup({
  type: new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(128),
  ]),
  description: new FormControl('', [
    Validators.required,
    Validators.minLength(20),
    Validators.maxLength(5000),
  ]),
});

 ngOnInit(): void {
  if(this.data){
    this.isEdit = true;
   this.deviceID = this.data.id;
   this.store.dispatch(fetchDeviceByID({id: this.deviceID}));
   this.store.select('device').subscribe((device) =>{
      if(device.selectedDevice){
        this.deviceForm.controls.type.setValue(device.selectedDevice.type);
        this.deviceForm.controls.description.setValue(device.selectedDevice.description);
      }
   });
  }
 }
  onNoClick(): void {
      this.dialogRef.close();
  }

  checkFields(){
    if (this.deviceForm.invalid) {
      this.deviceForm.markAllAsTouched();
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000, 
        panelClass: 'snackbar-error',
        verticalPosition: 'top',  
      });
      return false;
    }else return true;
  }

  onCreate(){
    if(this.checkFields()){
      const deviceFormData = this.deviceForm.value as Device;
      this.store.dispatch(createDevice({device: deviceFormData}));
    }
  }
  onUpdate(id:number){
    if(this.checkFields()){
      const deviceFormData = this.deviceForm.value as Device;
      deviceFormData.id = id;
      this.store.dispatch(updateDevice({updatedDevice: deviceFormData}));
    }
  }
  onDelete(){
    this.store.dispatch(deleteDevice({id: this.deviceID}));
  }
}
