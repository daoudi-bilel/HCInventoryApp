import {Employee} from '@appModels/employee';

export interface EmployeeState{
    employees:Employee[];
}

export const initialState: EmployeeState = {
  employees: [],
};



