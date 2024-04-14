import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './employees.routes';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { StoreModule } from '@ngrx/store';
import { EMPLOYEE_STATE_NAME } from '@appState/employee/employee.selectors';
import { EmployeeReducer } from '@appState/employee/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from '@appState/employee/employee.effects';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { EmployeesCreationComponent } from './pages/employees-creation/employees-creation.component';


@NgModule({
  declarations: [
    EmployeesListComponent,
    EmployeesCreationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(EMPLOYEE_STATE_NAME,EmployeeReducer),
    EffectsModule.forFeature([EmployeeEffects]),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    
    //Material modules
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule
  ]
})
export class EmployeesModule { }
