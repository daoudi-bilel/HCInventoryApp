import {Device} from '@appModels/device';

export interface DeviceState {
  devices: Device[];
  totalItems: number;
  totalPages: number;
  page: number;
  size: number;
  selectedDevice?: Device;

 }
 
 export const initialState: DeviceState = {
    devices: [],
    totalItems: 0,
    totalPages: 0,
    page: 0,
    size: 0,
 };
 
