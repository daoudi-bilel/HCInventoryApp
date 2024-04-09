import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DevicesPayload } from 'src/app/shared/payloads/DevicesPayload';
import { APP_CONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) {}

  devicesUrl = `${APP_CONFIG.API_URL}devices`;

  getDevices = () => this.http.get<DevicesPayload>(this.devicesUrl);

  addDevice = (device: any) => this.http.post(this.devicesUrl, device);

  getDeviceById = (id: number) => this.http.get(`${this.devicesUrl}/${id}`);

  editDevice = (device: any) => this.http.put(`${this.devicesUrl}/${device.id}`, device);

  deleteDevice = (id: number) => this.http.delete<any>(this.devicesUrl+`/${id}`);

}
