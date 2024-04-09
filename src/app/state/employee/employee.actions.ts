
import { createAction, props } from '@ngrx/store';
import { Employee } from '@appModels/employee';

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

//FETCH
export const fetchEmployees = createAction(FETCH_EMPLOYEES);

export const fetchEmployeesSuccess = createAction(
  FETCH_EMPLOYEES_SUCCESS,
  props<{ employees: Employee[] }>()
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
    props<{ id: string }>()
  );
  export const deleteEmployeeSuccess = createAction(
    DELETE_EMPLOYEE_SUCCESS,
    props<{ id: string }>());
  
  export const deleteEmployeeFailed = createAction(
    DELETE_EMPLOYEE_FAILED,
    props<{ error: any }>()
  );