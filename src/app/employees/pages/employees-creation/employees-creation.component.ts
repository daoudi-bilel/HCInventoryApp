import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from '@appModels/employee';
import { createEmployee, deleteEmployee, fetchEmployeeByID, updateEmployee } from '@appState/employee/employee.actions';
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
    private store: Store<{ employee: EmployeeState}>,
    private snackBar: MatSnackBar
 ) {}

  employeeID!: number;
  isEdit: boolean = false;
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
  });

  ngOnInit(): void {
    if(this.data){
      this.isEdit = true;
      this.employeeID = this.data.id;
      this.store.dispatch(fetchEmployeeByID({id: this.employeeID}));
      this.store.select('employee').subscribe((employee) =>{
         if(employee.selectedEmployee){
           this.employeeForm.controls.name.setValue(employee.selectedEmployee.name);
           this.employeeForm.controls.email.setValue(employee.selectedEmployee.email);
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

  onCreate(){
    if(this.checkFields()){
      const employeeFormData = this.employeeForm.value as Employee;
      this.store.dispatch(createEmployee({employee: employeeFormData}));
    }
  }
  onUpdate(id:number){
    if(this.checkFields()){
      const employeeFormData = this.employeeForm.value as Employee;
      this.store.dispatch(updateEmployee({updatedEmployee: employeeFormData}))
    }
  }
  onDelete(): void {
    this.store.dispatch(deleteEmployee({id: this.employeeID}));
 }

}
