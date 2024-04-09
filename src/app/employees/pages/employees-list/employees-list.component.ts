import { Component, OnInit } from '@angular/core';
import { Employee } from '@appModels/employee';
import { fetchEmployees } from '@appState/employee/employee.actions';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  constructor(private store: Store<{ employee: Employee}>) { }
  employeesList: Employee[] = [];
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<Employee>([]);


  ngOnInit(): void {
    debugger
    this.initStores();
  }

  initStores(){
    this.store.dispatch(fetchEmployees());
    this.store.select('employee').subscribe((employees: any) => {
      if(employees){
        this.employeesList = employees.employees.map((employee: any)=> ({
              id: employee.id,
              name: employee.name,
              email: employee.email,
            }));
            this.dataSource.data = this.employeesList; 
      }
      });
  }
}
