import { createReducer, on } from "@ngrx/store";
import { initialState } from "./employee.state";
import * as employeeActions from './employee.actions';

export const _employeeReducer = createReducer(
    initialState,
    on(employeeActions.fetchEmployeesSuccess, (state, action) =>{
      return {
        ...state,
        employees : action.employees,
      }
    }),
    on(employeeActions.fetchEmployeeByIDSuccess, (state, action) => ({
      ...state,
      selectedEmployee: action.employee,
    })),
    on(employeeActions.createEmployeeSuccess, (state, { employee }) => ({
      ...state,
      employees: [...state.employees, employee],
    })),
    on(employeeActions.updateEmployeeSuccess, (state, action) => ({
      ...state,
      selectedEmployee: action.updatedEmployee,
    })),
  );


export const EmployeeReducer = (action: any, state: any) =>
  _employeeReducer(action, state);