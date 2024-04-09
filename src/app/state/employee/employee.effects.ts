import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { EmployeesService } from "@appServices/employees/employees.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap , EMPTY, catchError, of, tap} from "rxjs";
import * as employeeActions from './employee.actions';
import { Employee } from "@appModels/employee";
import { CommonService } from "@appServices/common/common.service";

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions<any>,
    private router: Router,
    private employeesService: EmployeesService,
    private commonService: CommonService
  ) {}

  fetchEmployees$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActions.fetchEmployees),
      mergeMap(() => {
        return this.employeesService.getEmployees().pipe(
          map((employees) => {
            const employeesContent: Employee[] = this.commonService.toCamelCase(
                employees.content
              ) as Employee[];
            return employeeActions.fetchEmployeesSuccess({ employees: employeesContent });
          })
        );
      })
    );
  });

  fetchEmployeeByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.fetchEmployeeByID),
      switchMap((action) => {
        
        return this.employeesService.getEmployeeById(action.id).pipe(
          map((res: any) => {
            
            return employeeActions.fetchEmployeeByIDSuccess({
              employee: res,
            });
          }),
          catchError((error) => {
            return EMPTY;
          })
          
        );
      }
      ))
    );


    createSlider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.createEmployee),
      switchMap((action) => {
        
        return this.employeesService.createEmployee(action.employee).pipe(
          map((res: any) => {
            
            this.router.navigate(['/employees']);
            return employeeActions.createEmployeeSuccess(res);
          }),
          catchError((error) => {
            if(error.status === 409 || error.status === 400){
              //conflict
            }else
            alert('other error')
            return EMPTY;
          })
        );
      })
    )
  );

  updateSlider$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActions.updateEmployee),
      switchMap((action) => {

        return this.employeesService.updateEmployee(action.updatedEmployee).pipe(
          map((res: any) => {
            this.router.navigate(['/employees']);
            return employeeActions.updateEmployeeSuccess({
              updatedEmployee: res,
            });
          }),
          catchError((error) => {
            alert('error');
            return EMPTY;
          })
        );
      })
    ));

    deleteSlider$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(employeeActions.deleteEmployee),
        mergeMap((action) => {
  
          return this.employeesService.deleteEmployee(parseInt(action.id)).pipe(
            tap(() => {
              this.router.navigate(['/employees']);
            }),
            mergeMap(() => [
              employeeActions.deleteEmployeeSuccess({ id: action.id }),
              employeeActions.fetchEmployees(), // Dispatch fetchEmployees action after successful deletion
            ]),
            catchError((error) => {
              console.error('Error in deleting Slider', error);
              
              return of(employeeActions.deleteEmployeeFailed({ error }));
            })
          );
        })
      );
    });
}