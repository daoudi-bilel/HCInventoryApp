import { createFeatureSelector } from '@ngrx/store';
import { EmployeeState } from './employee.state';

export const EMPLOYEE_STATE_NAME = 'employee';

const getEmployeesState = createFeatureSelector<EmployeeState>(EMPLOYEE_STATE_NAME);