import { createReducer, on } from "@ngrx/store";
import { initialState } from "./employee.state";
import * as employeeActions from './employee.actions';

export const _employeeReducer = createReducer(
    initialState,
    on(employeeActions.fetchEmployeesSuccess, (state, { employees,
        totalItems,
        totalPages,
        page,
        size
      }) => ({
      ...state,
      employees,
      totalItems,
      totalPages,
      page,
      size
   })),
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
    on(employeeActions.searchEmployeesByKeywordSuccess, (state, action) => ({
      ...state,
      employees: action.searchedEmployees,
    })),
  );


export const EmployeeReducer = (action: any, state: any) =>
  _employeeReducer(action, state);