import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesListComponent } from './pages/devices-list/devices-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './devices.routes';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StoreModule } from '@ngrx/store';
import { DEVICE_STATE_NAME } from '@appState/devices/device.selectors';
import { DeviceReducer } from '@appState/devices/device.reducer';
import { DeviceEffects } from '@appState/devices/device.effects';
import { EffectsModule } from '@ngrx/effects';
import { DevicesCreationComponent } from './pages/devices-creation/devices-creation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  
    DevicesListComponent,
       DevicesCreationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(DEVICE_STATE_NAME,DeviceReducer),
    EffectsModule.forFeature([DeviceEffects]),
    FormsModule,
    SharedModule,

     //Material modules
     MatButtonModule,
     MatDialogModule,
     MatFormFieldModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatSelectModule,
     MatTableModule,
     MatPaginatorModule,
     MatSortModule,
     MatIconModule

  ]
})
export class DevicesModule { }
