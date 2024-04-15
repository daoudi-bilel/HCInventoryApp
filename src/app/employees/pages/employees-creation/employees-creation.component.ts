import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Device } from '@appModels/device';
import { Employee } from '@appModels/employee';
import { fetchDevices } from '@appState/devices/device.actions';
import { createEmployee, deleteEmployee, fetchEmployeeByID, updateEmployee, updateEmployeeDevices } from '@appState/employee/employee.actions';
import { EmployeeState } from '@appState/employee/employee.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employees-creation',
  templateUrl: './employees-creation.component.html',
  styleUrls: ['./employees-creation.component.scss']
})
export class EmployeesCreationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EmployeesCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private store: Store<{ employee: EmployeeState; device: Device}>,
    private snackBar: MatSnackBar
 ) {}

  employeeID!: number;
  employeeData!: Employee;
  isEdit: boolean = false;
  devices: any = [];

  employeeForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(128),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(128),
      Validators.email
    ]),
    deviceIds: new FormControl([0],
      Validators.required
    ),
  });

  ngOnInit(): void {
    debugger
    this.initDevices();
    if(this.data){
      this.isEdit = true;
      this.employeeID = this.data.id;
      this.store.dispatch(fetchEmployeeByID({id: this.employeeID}));
      this.store.select('employee').subscribe((employee) =>{
         if(employee.selectedEmployee){
          this.employeeData = employee.selectedEmployee; 
           this.employeeForm.controls.name.setValue(employee.selectedEmployee.name);
           this.employeeForm.controls.email.setValue(employee.selectedEmployee.email);
           if(employee.selectedEmployee.devices){
             const deviceIds = employee.selectedEmployee.devices.map((device:any) => device.id);
             this.employeeForm.controls.deviceIds.setValue(deviceIds);
           }

         }
      });
    }
  }
  onNoClick(): void {
      this.dialogRef.close();
  }

  checkFields(){
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000, 
        panelClass: 'snackbar-error',
        verticalPosition: 'top',  
      });
      return false;
    }else return true;
  }

  initDevices(){
    this.store.dispatch(fetchDevices({pageNumber: 1, pageSize: 100}));
    this.store.select('device').subscribe((res: any) => {
      if(res)
        this.devices = res.devices;
    });
  }

  onCreate(){
    if(this.checkFields()){
      debugger
      const employeeFormData = this.employeeForm.value as any;
      this.store.dispatch(createEmployee({employee: employeeFormData}));
    }
  }
  onUpdate(id:number){
    debugger
    if(this.checkFields()){
      const employeeFormData = this.employeeForm.value as Employee;
      employeeFormData.id = id;
      this.store.dispatch(updateEmployee({updatedEmployee: employeeFormData}));


      const currentDeviceIds = this.employeeForm.controls.deviceIds.value;
      if(this.employeeData.devices){
        const originalDeviceIds = this.employeeData.devices.map(device => device.id);
        if (currentDeviceIds  &&(JSON.stringify(currentDeviceIds.sort()) !== JSON.stringify(originalDeviceIds.sort()))) {
          this.store.dispatch(updateEmployeeDevices({ id: id, deviceIds: currentDeviceIds }));
      }
      }
    }
  }
  onDelete(): void {
    this.store.dispatch(deleteEmployee({id: this.employeeID}));
 }

}
