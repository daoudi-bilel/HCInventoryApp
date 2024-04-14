import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then((m) => m.EmployeesModule),
  },
  {
    path: 'devices',
    loadChildren: () => import('./devices/devices.module').then((m) => m.DevicesModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
