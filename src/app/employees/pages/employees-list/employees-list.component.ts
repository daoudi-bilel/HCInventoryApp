import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '@appModels/employee';
import { fetchEmployees, searchEmployeesByKeyword } from '@appState/employee/employee.actions';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeState } from '@appState/employee/employee.state';
import { LoadingScreenService } from '@appServices/loading-screen/loading-screen.service';
import { EmployeesCreationComponent } from '../employees-creation/employees-creation.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
 selector: 'app-employees-list',
 templateUrl: './employees-list.component.html',
 styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit, AfterViewInit {

 constructor(private store: Store<{ employee: EmployeeState}>,
             public dialog: MatDialog
 ) { }

 employeesList: Employee[] = [];
 displayedColumns: string[] = ['id', 'name', 'email', 'edit'];
 dataSource = new MatTableDataSource<Employee>([]);
 isLoading: boolean = true;
 currentPage: number = 1;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

 ngOnInit(): void {
    this.initStores();
 }

 ngAfterViewInit() {
    this.initPaginator();
 }

 initStores(){
  
    this.isLoading = true;
    this.store.dispatch(fetchEmployees({pageNumber:this.currentPage,pageSize:10}));
    this.store.select('employee').subscribe(
      (res: EmployeeState) => {
      if(res && res.employees){
        this.employeesList = res.employees.map((employee: any)=> ({
              id: employee.id,
              name: employee.name,
              email: employee.email,
            }));
        this.dataSource.data = this.employeesList;
        this.dataSource.sort = this.sort;

        if (this.paginator) {
          this.paginator.length = res.totalItems;
          this.paginator.pageIndex = res.page - 1;
          this.paginator.pageSize = res.size;
        }
        this.isLoading = false;
      }
    }
    ,()=> this.isLoading = false
  );
 }

 initPaginator(){
    if(this.paginator){
      this.paginator.page.subscribe(pageEvent => {
        this.currentPage = pageEvent.pageIndex + 1;
        this.store.dispatch(fetchEmployees({ pageNumber: this.currentPage, pageSize: pageEvent.pageSize }));
      });
    }
 }   

 openUpdateDialog(employee: Employee): void {
  const dialogRef = this.dialog.open(EmployeesCreationComponent, {
    width: '60%',
    data: employee
  });
  dialogRef.afterClosed().subscribe(result => {});
 }

 openCreateDialog(){
  const dialogRef = this.dialog.open(EmployeesCreationComponent, {
    width: '60%',
    data: null
  });
  dialogRef.afterClosed().subscribe(result => {});
 }

 onSearchEvent(searchTerm: string | null){
    if(searchTerm)
      this.store.dispatch(searchEmployeesByKeyword({keyword: searchTerm}));    
    else
      this.initStores();
  }
}
