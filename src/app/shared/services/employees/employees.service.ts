import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_CONFIG } from 'src/environments/environment';
import { EmployeesPayload } from 'src/app/shared/payloads/EmployeesPayload';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {}

  employeesUrl = `${APP_CONFIG.API_URL}employees`;

  getEmployees = (pageNumber: number, pageSize: number) => 
    this.http.get<EmployeesPayload>(`${this.employeesUrl}?page=${pageNumber}&size=${pageSize}`);
 
  getEmployeeById = (id: number) => this.http.get(`${this.employeesUrl}/${id}`);
  
  createEmployee = (employee: any) => this.http.post(this.employeesUrl, employee);

  updateEmployee = (employee: any) => this.http.put(`${this.employeesUrl}/${employee.id}`, employee);

  deleteEmployee = (id: number) => this.http.delete<any>(this.employeesUrl+`/${id}`);

  onSearch(keyword: string){
    let params = new HttpParams();
    params = params.set('keyword', keyword);
    params = params.set('size', 100);
    return this.http.get<any>(this.employeesUrl, {params: params});
  }

}
