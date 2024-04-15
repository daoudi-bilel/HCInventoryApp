
import { createAction, props } from '@ngrx/store';
import { Device } from '@appModels/device';
import { Employee } from '@appModels/employee';

export const FETCH_DEVICES = '[Device] Fetch Device';
export const FETCH_DEVICES_SUCCESS = '[Device] Fetch Device Success';
export const FETCH_DEVICES_FAILED = '[Device] Fetch Device Failed';

export const FETCH_DEVICE_BY_ID = '[Device] Fetch Device By Id';
export const FETCH_DEVICE_BY_ID_SUCCESS = '[Device] Fetch Device By Id Success';
export const FETCH_DEVICE_BY_ID_FAILED = '[Device] Fetch Device By Id Failed';

export const CREATE_DEVICE = '[Device] Create Device';
export const CREATE_DEVICE_SUCCESS = '[Device] Create Device Success';
export const CREATE_DEVICE_FAILED = '[Device] Create Device Failed';

export const UPDATE_DEVICE = '[Device] Update Device';
export const UPDATE_DEVICE_SUCCESS = '[Device] Update Device Success';
export const UPDATE_DEVICE_FAILED = '[Device] Update Device Failed';

export const DELETE_DEVICE = '[Device] Delete Device';
export const DELETE_DEVICE_SUCCESS = '[Device] Delete Device Success';
export const DELETE_DEVICE_FAILED = '[Device] Delete Device Failed';

export const SEARCH_DEVICES_BY_STATUS = '[Devices] Search Devices by Keyword';
export const SEARCH_DEVICES_BY_STATUS_SUCCESS = '[Devices]Search Devices By Keyword Success';
export const SEARCH_DEVICES_BY_STATUS_FAILED = '[Devices]Search Devices By Keyword Failed';

export const ASSIGN_DEVICE_TO_EMPLOYEE = '[Device] Assign Device to Employee';
export const ASSIGN_DEVICE_TO_EMPLOYEE_SUCCESS = '[Device] Assign Device to Employee Success';
export const ASSIGN_DEVICE_TO_EMPLOYEE_FAILED = '[Device] Assign Device to Employee Failed';

export const UNASSIGN_DEVICE_FROM_EMPLOYEE = '[Device] Unassign Device from Employee';
export const UNASSIGN_DEVICE_FROM_EMPLOYEE_SUCCESS = '[Device] Unassign Device from Employee Success';
export const UNASSIGN_DEVICE_FROM_EMPLOYEE_FAILED = '[Device] Unassign Device from Employee Failed';


//FETCH
export const fetchDevices = createAction(
  FETCH_DEVICES,
  props<{ pageNumber: number, pageSize: number}>()
);

export const fetchDevicesSuccess = createAction(
  FETCH_DEVICES_SUCCESS,
  props<{ devices: Device[], totalItems: number, totalPages: number, page: number, size: number }>()
 );
 
export const fetchDevicesFailed = createAction(
  FETCH_DEVICES_FAILED,
  props<{ error: any }>()
);

//FETCH by id
export const fetchDeviceByID = createAction(
    FETCH_DEVICE_BY_ID,
    props<{ id: number}>()
    );
  export const fetchDeviceByIDSuccess = createAction(
    FETCH_DEVICE_BY_ID_SUCCESS,
    props<{ device: Device }>()
  );
  export const fetchDeviceByIDFailed = createAction(
    FETCH_DEVICE_BY_ID_FAILED,
    props<{ error: any }>()
  );
  
  //CREATE 
  export const createDevice = createAction(
    CREATE_DEVICE,
    props<{ device: Device }>()
  );
  export const createDeviceSuccess = createAction(
    CREATE_DEVICE_SUCCESS,
    props<{ device: Device }>()
  );
  export const createDeviceFailed = createAction(
    CREATE_DEVICE_FAILED,
    props<{ error: any }>()
  );
  
  //UPDATE
  export const updateDevice = createAction(
    UPDATE_DEVICE,
    props<{ updatedDevice: Device }>()
  );
  export const updateDeviceSuccess = createAction(
    UPDATE_DEVICE_SUCCESS,
    props<{ updatedDevice: Device }>()
    );
  
  export const updateDeviceFailed = createAction(
    UPDATE_DEVICE_FAILED,
    props<{ error: any }>()
  );
  
  //DELETE
  export const deleteDevice = createAction(
    DELETE_DEVICE,
    props<{ id: number }>()
  );
  export const deleteDeviceSuccess = createAction(
    DELETE_DEVICE_SUCCESS,
    props<{ id: number }>());
  
  export const deleteDeviceFailed = createAction(
    DELETE_DEVICE_FAILED,
    props<{ error: any }>()
  );

    //SEARCH
    export const searchDevicesByKeyword = createAction(
      SEARCH_DEVICES_BY_STATUS,
      props<{ keyword: string }>()
    );
    export const searchDevicesByKeywordSuccess = createAction(
      SEARCH_DEVICES_BY_STATUS_SUCCESS,
      props<{ searchedDevices: any }>()
    );
    export const searchDevicesByKeywordFailed = createAction(
      SEARCH_DEVICES_BY_STATUS_FAILED
    );

    //ASSIGN
    export const assignDeviceToEmployee = createAction(
    ASSIGN_DEVICE_TO_EMPLOYEE,
    props<{ device: Device; employee: Employee }>()
    );

    export const assignDeviceToEmployeeSuccess = createAction(
    ASSIGN_DEVICE_TO_EMPLOYEE_SUCCESS,
    props<{ device: Device; employee: Employee }>()
    );

    export const assignDeviceToEmployeeFailed = createAction(
    ASSIGN_DEVICE_TO_EMPLOYEE_FAILED,
    props<{ error: any }>()
    );

    //UNASSIGN
    export const unassignDeviceFromEmployee = createAction(
      UNASSIGN_DEVICE_FROM_EMPLOYEE,
      props<{ device: Device; employee: Employee }>()
    );

    export const unassignDeviceFromEmployeeSuccess = createAction(
      UNASSIGN_DEVICE_FROM_EMPLOYEE_SUCCESS,
      props<{ device: Device; employee: Employee }>()
    );

    export const unassignDeviceFromEmployeeFailed = createAction(
      UNASSIGN_DEVICE_FROM_EMPLOYEE_FAILED,
      props<{ error: any }>()
    );