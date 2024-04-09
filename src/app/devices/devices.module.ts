import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesListComponent } from './pages/devices-list/devices-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './devices.routes';


@NgModule({
  declarations: [
  
    DevicesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class DevicesModule { }
