import {Employee} from '@appModels/employee';

export interface EmployeeState {
  employees: Employee[];
  totalItems: number;
  totalPages: number;
  page: number;
  size: number;
  selectedEmployee?: Employee;
 }
 
 export const initialState: EmployeeState = {
  employees: [],
  totalItems: 0,
  totalPages: 0,
  page: 0,
  size: 0
 };
 
