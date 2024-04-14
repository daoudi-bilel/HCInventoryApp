import { createFeatureSelector } from '@ngrx/store';
import { DeviceState } from './device.state';

export const DEVICE_STATE_NAME = 'device';

const getDevicesState = createFeatureSelector<DeviceState>(DEVICE_STATE_NAME);