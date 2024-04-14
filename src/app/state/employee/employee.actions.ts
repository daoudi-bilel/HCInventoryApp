
import { createAction, props } from '@ngrx/store';
import { Employee } from '@appModels/employee';
import { EmployeesPayload } from '@appPayloads/EmployeesPayload';

export const FETCH_EMPLOYEES = '[Employee] Fetch Employee';
export const FETCH_EMPLOYEES_SUCCESS = '[Employee] Fetch Employee Success';
export const FETCH_EMPLOYEES_FAILED = '[Employee] Fetch Employee Failed';

export const FETCH_EMPLOYEE_BY_ID = '[Employee] Fetch Employee By Id';
export const FETCH_EMPLOYEE_BY_ID_SUCCESS = '[Employee] Fetch Employee By Id Success';
export const FETCH_EMPLOYEE_BY_ID_FAILED = '[Employee] Fetch Employee By Id Failed';

export const CREATE_EMPLOYEE = '[Employee] Create Employee';
export const CREATE_EMPLOYEE_SUCCESS = '[Employee] Create Employee Success';
export const CREATE_EMPLOYEE_FAILED = '[Employee] Create Employee Failed';

export const UPDATE_EMPLOYEE = '[Employee] Update Employee';
export const UPDATE_EMPLOYEE_SUCCESS = '[Employee] Update Employee Success';
export const UPDATE_EMPLOYEE_FAILED = '[Employee] Update Employee Failed';

export const DELETE_EMPLOYEE = '[Employee] Delete Employee';
export const DELETE_EMPLOYEE_SUCCESS = '[Employee] Delete Employee Success';
export const DELETE_EMPLOYEE_FAILED = '[Employee] Delete Employee Failed';

export const SEARCH_EMPLOYEES_BY_STATUS = '[Employees] Search Employees by Keyword';
export const SEARCH_EMPLOYEES_BY_STATUS_SUCCESS = '[Employees]Search Employees By Keyword Success';
export const SEARCH_EMPLOYEES_BY_STATUS_FAILED = '[Employees]Search Employees By Keyword Failed';

//FETCH
export const fetchEmployees = createAction(
  FETCH_EMPLOYEES,
  props<{ pageNumber: number, pageSize: number}>()
);

export const fetchEmployeesSuccess = createAction(
  FETCH_EMPLOYEES_SUCCESS,
  props<{ employees: Employee[], totalItems: number, totalPages: number, page: number, size: number }>()
 );
 
export const fetchEmployeesFailed = createAction(
  FETCH_EMPLOYEES_FAILED,
  props<{ error: any }>()
);

//FETCH by id
export const fetchEmployeeByID = createAction(
    FETCH_EMPLOYEE_BY_ID,
    props<{ id: number}>()
    );
  export const fetchEmployeeByIDSuccess = createAction(
    FETCH_EMPLOYEE_BY_ID_SUCCESS,
    props<{ employee: Employee }>()
  );
  export const fetchEmployeeByIDFailed = createAction(
    FETCH_EMPLOYEE_BY_ID_FAILED,
    props<{ error: any }>()
  );
  
  //CREATE 
  export const createEmployee = createAction(
    CREATE_EMPLOYEE,
    props<{ employee: Employee }>()
  );
  export const createEmployeeSuccess = createAction(
    CREATE_EMPLOYEE_SUCCESS,
    props<{ employee: Employee }>()
  );
  export const createEmployeeFailed = createAction(
    CREATE_EMPLOYEE_FAILED,
    props<{ error: any }>()
  );
  
  //UPDATE
  export const updateEmployee = createAction(
    UPDATE_EMPLOYEE,
    props<{ updatedEmployee: Employee }>()
  );
  export const updateEmployeeSuccess = createAction(
    UPDATE_EMPLOYEE_SUCCESS,
    props<{ updatedEmployee: Employee }>()
    );
  
  export const updateEmployeeFailed = createAction(
    UPDATE_EMPLOYEE_FAILED,
    props<{ error: any }>()
  );
  
  //DELETE
  export const deleteEmployee = createAction(
    DELETE_EMPLOYEE,
    props<{ id: number }>()
  );
  export const deleteEmployeeSuccess = createAction(
    DELETE_EMPLOYEE_SUCCESS,
    props<{ id: number }>());
  
  export const deleteEmployeeFailed = createAction(
    DELETE_EMPLOYEE_FAILED,
    props<{ error: any }>()
  );

  //SEARCH
  export const searchEmployeesByKeyword = createAction(
    SEARCH_EMPLOYEES_BY_STATUS,
    props<{ keyword: string }>()
  );
  export const searchEmployeesByKeywordSuccess = createAction(
    SEARCH_EMPLOYEES_BY_STATUS_SUCCESS,
    props<{ searchedEmployees: any }>()
  );
  export const searchEmployeesByKeywordFailed = createAction(
    SEARCH_EMPLOYEES_BY_STATUS_FAILED
  );