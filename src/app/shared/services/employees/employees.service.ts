import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'src/environments/environment';
import { EmployeesPayload } from 'src/app/shared/payloads/EmployeesPayload';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {}

  employeesUrl = `${APP_CONFIG.API_URL}employees`;

  getEmployees = () => this.http.get<EmployeesPayload>(this.employeesUrl);

  getEmployeeById = (id: number) => this.http.get(`${this.employeesUrl}/${id}`);
  
  createEmployee = (employee: any) => this.http.post(this.employeesUrl, employee);

  updateEmployee = (employee: any) => this.http.put(`${this.employeesUrl}/${employee.id}`, employee);

  deleteEmployee = (id: number) => this.http.delete<any>(this.employeesUrl+`/${id}`);

}
