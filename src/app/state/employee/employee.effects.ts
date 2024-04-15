import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeesService } from "@appServices/employees/employees.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap , EMPTY, catchError, of, tap} from "rxjs";
import * as employeeActions from './employee.actions';
import { LoadingScreenService } from "@appServices/loading-screen/loading-screen.service";
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions<any>,
    private router: Router,
    private employeesService: EmployeesService,
    private loadingScreenService: LoadingScreenService,
    private snackBar: MatSnackBar
  ) {}

  fetchEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActions.fetchEmployees),
      mergeMap((action) => {
        this.loadingScreenService.show();
        return this.employeesService.getEmployees(action.pageNumber, action.pageSize).pipe(
          map((employees) => {
            debugger
            this.loadingScreenService.hide();
            return employeeActions.fetchEmployeesSuccess({
               employees: employees.content,
               totalItems: employees.totalItems,
               totalPages: employees.totalPages,
               page: employees.page,
               size: employees.size,
            });
           })
        );
      })
    );
  });

  
  fetchEmployeeByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.fetchEmployeeByID),
      switchMap((action) => {
        this.loadingScreenService.show();
        return this.employeesService.getEmployeeById(action.id).pipe(
          map((res: any) => {
            this.loadingScreenService.hide();
            return employeeActions.fetchEmployeeByIDSuccess({
              employee: res,
            });
          }),
          catchError(() => {
            this.loadingScreenService.hide();
            return EMPTY;
          })
          
        );
      }
      ))
    );


    createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.createEmployee),
      switchMap((action) => {
        this.loadingScreenService.show();
        return this.employeesService.createEmployee(action.employee).pipe(
          map((res: any) => {
            this.snackBar.open('Employee created successfully', 'Close', {
              duration: 3000, 
              panelClass: 'snackbar-success',
              verticalPosition: 'top',
            });
            this.loadingScreenService.hide();
            this.router.navigate(['/employees']);
            return employeeActions.createEmployeeSuccess(res);
          }),
          catchError((error) => {
            this.loadingScreenService.hide();
            if(error.status === 409 || error.status === 400){
              this.snackBar.open('Conflict Error', 'Close', {
                duration: 3000, 
                panelClass: 'snackbar-error',
                verticalPosition: 'top',
              });
            }else
            this.snackBar.open('Error while creating employee', 'Close', {
              duration: 3000, 
              panelClass: 'snackbar-error',
              verticalPosition: 'top',
            });
            return EMPTY;
          })
        );
      })
    ));
    createEmployeeSuccess$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(employeeActions.createEmployeeSuccess),
          mergeMap(() => {
              return of(employeeActions.fetchEmployees({ pageNumber: 1, pageSize: 10 }));
          })
      );
  });

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.updateEmployee),
      switchMap((action) => {
        this.loadingScreenService.show();
        return this.employeesService.updateEmployee(action.updatedEmployee).pipe(
          map((res: any) => {
            this.snackBar.open('Employee updated successfully', 'Close', {
              duration: 3000, 
              panelClass: 'snackbar-success',
              verticalPosition: 'top',
            });
            this.loadingScreenService.hide();
            this.router.navigate(['/employees']);
            return employeeActions.updateEmployeeSuccess({
              updatedEmployee: res,
            });
          }),
          catchError((error) => {
            this.snackBar.open('Error updating the employee', 'Close', {
              duration: 3000, 
              panelClass: 'snackbar-error',
              verticalPosition: 'top',
            });
            this.loadingScreenService.hide();
            return EMPTY;
          })
        );
      })
    ));
    updateEmployeeSuccess$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(employeeActions.updateEmployeeSuccess),
          mergeMap(() => {
              return of(employeeActions.fetchEmployees({ pageNumber: 1, pageSize: 10 }));
          })
      );
  });

    deleteEmployee$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(employeeActions.deleteEmployee),
        mergeMap((action) => {
          this.loadingScreenService.show();
  
          return this.employeesService.deleteEmployee(action.id).pipe(
            map(() => {
              this.snackBar.open('Employee deleted successfully', 'Close', {
                duration: 3000, 
                panelClass: 'snackbar-success',
                verticalPosition: 'top',
              });
              this.loadingScreenService.hide();
              return employeeActions.deleteEmployeeSuccess({ id: action.id });
            }),
            catchError((error) => {
              debugger
              let message = 'Error in deleting Employee';
              if(error.status == 409){
                message = error.error.message;
              }
              this.snackBar.open(message, 'Close', {
                duration: 3000, 
                panelClass: 'snackbar-error',
                verticalPosition: 'top',
              });
              this.loadingScreenService.hide();
              return of(employeeActions.deleteEmployeeFailed({ error }));
            })
          );
        })
      );
    });
    deleteEmployeeSuccess$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(employeeActions.deleteEmployeeSuccess),
          mergeMap(() => {
              return of(employeeActions.fetchEmployees({ pageNumber: 1, pageSize: 10 }));
          })
      );
  });
  
  searchEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.searchEmployeesByKeyword),
      switchMap((action) => {
        this.loadingScreenService.show();
        return this.employeesService.onSearch(action.keyword).pipe(
          map((result: any) => {
            this.loadingScreenService.hide();
            const employeesList = result.content;
            return employeeActions.searchEmployeesByKeywordSuccess({
              searchedEmployees: employeesList,
            });
          }),
          catchError((error) => {
            this.loadingScreenService.hide();
            return EMPTY;
          })
        );
      })
    ));

    updateEmployeeDevices$ = createEffect(() =>
      this.actions$.pipe(
         ofType(employeeActions.updateEmployeeDevices),
         switchMap((action) => {
           this.loadingScreenService.show();
           return this.employeesService.updateEmployeeDevices(action.id, action.deviceIds).pipe(
             map(() => {
               this.loadingScreenService.hide();
               return employeeActions.updateEmployeeDevicesSuccess();
             }),
             catchError((error) => {
               this.snackBar.open('Error updating employee devices', 'Close', {
                 duration: 3000, 
                 panelClass: 'snackbar-error',
                 verticalPosition: 'top',
               });
               this.loadingScreenService.hide();
               return of(employeeActions.updateEmployeeDevicesFailed({ error }));
             })
           );
         })
      ));
     
}