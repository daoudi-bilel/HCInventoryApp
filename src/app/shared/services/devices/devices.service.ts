import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DevicesPayload } from 'src/app/shared/payloads/DevicesPayload';
import { APP_CONFIG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) {}

  devicesUrl = `${APP_CONFIG.API_URL}devices`;

  getDevices = (pageNumber: number, pageSize: number) => 
    this.http.get<DevicesPayload>(`${this.devicesUrl}?page=${pageNumber}&size=${pageSize}`);

  createDevice = (device: any) => this.http.post(this.devicesUrl, device);

  getDeviceById = (id: number) => this.http.get(`${this.devicesUrl}/${id}`);

  updateDevice = (device: any) => this.http.put(`${this.devicesUrl}/${device.id}`, device);

  deleteDevice = (id: number) => this.http.delete<any>(this.devicesUrl+`/${id}`);

  onSearch(keyword: string){
    let params = new HttpParams();
    params = params.set('keyword', keyword);
    params = params.set('size', 100);
    return this.http.get<any>(this.devicesUrl, {params: params});
  }

  assignDeviceToEmployee(deviceId: number, employeeId: number) {
    return this.http.put(`api/devices/${deviceId}/employee`, { employeeId });
  }

  unassignDeviceFromEmployee(deviceId: number) {
    return this.http.put(`api/devices/${deviceId}/employee`, null);
  }

}
