import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap , EMPTY, catchError, of, tap} from "rxjs";
import * as deviceActions from './device.actions';
import { LoadingScreenService } from "@appServices/loading-screen/loading-screen.service";
import { DevicesService } from "@appServices/devices/devices.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class DeviceEffects {
  constructor(
    private actions$: Actions<any>,
    private router: Router,
    private devicesService: DevicesService,
    private loadingScreenService: LoadingScreenService,
    private snackBar: MatSnackBar

  ) {}

  fetchDevices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deviceActions.fetchDevices),
      mergeMap((action) => {
        this.loadingScreenService.show();
        return this.devicesService.getDevices(action.pageNumber, action.pageSize).pipe(
          map((devices) => {
            debugger
            this.loadingScreenService.hide();
            return deviceActions.fetchDevicesSuccess({
               devices: devices.content,
               totalItems: devices.totalItems,
               totalPages: devices.totalPages,
               page: devices.page,
               size: devices.size,
            });
           })
        );
      })
    );
  });

  
  fetchDeviceByID$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deviceActions.fetchDeviceByID),
      switchMap((action) => {
        this.loadingScreenService.show();
        return this.devicesService.getDeviceById(action.id).pipe(
          map((res: any) => {
            debugger
            this.loadingScreenService.hide();
            return deviceActions.fetchDeviceByIDSuccess({
              device: res,
            });
          }),
          catchError(() => {
            this.loadingScreenService.hide();
            return EMPTY;
          })
          
        );
      }
      ))
    );


    createDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deviceActions.createDevice),
      switchMap((action) => {
        this.loadingScreenService.show();
        return this.devicesService.createDevice(action.device).pipe(
          map((res: any) => {
            this.snackBar.open('Device created successfully', 'Close', {
              duration: 3000, 
              panelClass: 'snackbar-success',
              verticalPosition: 'top',
            });
            this.loadingScreenService.hide();
            this.router.navigate(['/devices']);
            return deviceActions.createDeviceSuccess(res);
          }),
          catchError((error) => {
            this.loadingScreenService.hide();
            if(error.status === 409 || error.status === 400){
              this.snackBar.open('Conflict Error', 'Close', {
                duration: 3000, 
                panelClass: 'snackbar-error',
                verticalPosition: 'top',
              });
            }else
            this.snackBar.open('Error while creating the device', 'Close', {
              duration: 3000, 
              panelClass: 'snackbar-error',
              verticalPosition: 'top',
            });
            return EMPTY;
          })
        );
      })
    ));
    createDeviceSuccess$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(deviceActions.createDeviceSuccess),
          mergeMap(() => {
              return of(deviceActions.fetchDevices({ pageNumber: 1, pageSize: 10 }));
          })
      );
  });

  updateDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deviceActions.updateDevice),
      switchMap((action) => {
        this.loadingScreenService.show();
        return this.devicesService.updateDevice(action.updatedDevice).pipe(
          map((res: any) => {
            this.snackBar.open('Device updated Successfully', 'Close', {
              duration: 3000, 
              panelClass: 'snackbar-success',
              verticalPosition: 'top',
            });
        this.loadingScreenService.hide();
            this.router.navigate(['/devices']);
            return deviceActions.updateDeviceSuccess({
              updatedDevice: res,
            });
          }),
          catchError((error) => {
            this.snackBar.open('Error while updating the device', 'Close', {
              duration: 3000, 
              panelClass: 'snackbar-error',
              verticalPosition: 'top',
            });
            this.loadingScreenService.hide();
            return EMPTY;
          })
        );
      })
    ));
    updateDeviceSuccess$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(deviceActions.updateDeviceSuccess),
          mergeMap(() => {
              return of(deviceActions.fetchDevices({ pageNumber: 1, pageSize: 10 }));
          })
      );
  });

    deleteDevice$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(deviceActions.deleteDevice),
        mergeMap((action) => {
          this.loadingScreenService.show();
  
          return this.devicesService.deleteDevice(action.id).pipe(
            map(() => {
              this.snackBar.open('Employee deleted successfully', 'Close', {
                duration: 3000, 
                panelClass: 'snackbar-success',
                verticalPosition: 'top',
              });
              this.loadingScreenService.hide();
              return deviceActions.deleteDeviceSuccess({ id: action.id });
            }),
            catchError((error) => {
              debugger
              let message = 'Error in deleting Employee';
              if(error.status == 409){
                message = error.error.message;
              }
              this.snackBar.open(message, 'Close', {
                duration: 3000, 
                panelClass: 'snackbar-error',
                verticalPosition: 'top',
              });
              this.loadingScreenService.hide();
              return of(deviceActions.deleteDeviceFailed({ error }));
            })
          );
        })
      );
    });
    deleteDeviceSuccess$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(deviceActions.deleteDeviceSuccess),
          mergeMap(() => {
              return of(deviceActions.fetchDevices({ pageNumber: 1, pageSize: 10 }));
          })
      );
  });

  searchDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deviceActions.searchDevicesByKeyword),
      switchMap((action) => {
        this.loadingScreenService.show();
        return this.devicesService.onSearch(action.keyword).pipe(
          map((result: any) => {
            this.loadingScreenService.hide();
            const devicesList = result.content;
            return deviceActions.searchDevicesByKeywordSuccess({
              searchedDevices: devicesList,
            });
          }),
          catchError((error) => {
            this.loadingScreenService.hide();
            return EMPTY;
          })
        );
      })
    ));
   
  }