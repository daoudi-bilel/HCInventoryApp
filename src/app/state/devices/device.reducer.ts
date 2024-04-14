import { createReducer, on } from "@ngrx/store";
import { initialState } from "./device.state";
import * as deviceActions from './device.actions';

export const _deviceReducer = createReducer(
    initialState,
    on(deviceActions.fetchDevicesSuccess, (state, { devices,
        totalItems,
        totalPages,
        page,
        size
      }) => ({
      ...state,
      devices,
      totalItems,
      totalPages,
      page,
      size
   })),
    on(deviceActions.fetchDeviceByIDSuccess, (state, action) => ({
      ...state,
      selectedDevice: action.device,
    })),
    on(deviceActions.createDeviceSuccess, (state, { device }) => ({
      ...state,
      device: [...state.devices, device],
    })),
    on(deviceActions.updateDeviceSuccess, (state, action) => ({
      ...state,
      selectedDevice: action.updatedDevice,
    })),
    on(deviceActions.searchDevicesByKeywordSuccess, (state, action) => ({
      ...state,
      devices: action.searchedDevices,
    })),
  );


export const DeviceReducer = (action: any, state: any) =>
  _deviceReducer(action, state);