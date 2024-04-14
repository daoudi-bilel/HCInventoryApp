import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from '@appModels/device';
import { fetchDevices, searchDevicesByKeyword } from '@appState/devices/device.actions';
import { DeviceState } from '@appState/devices/device.state';
import { Store } from '@ngrx/store';
import { DevicesCreationComponent } from '../devices-creation/devices-creation.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.scss']
})
export class DevicesListComponent implements OnInit {

  constructor(private store: Store<{ device: DeviceState}>,
              public dialog: MatDialog
  ) { }

  devicesList: Device[] = [];
  displayedColumns: string[] = ['id', 'type', 'description', 'edit'];
  dataSource = new MatTableDataSource<Device>([]);
  isLoading: boolean = true;
  currentPage: number = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 searchControl = new FormControl('');
 @ViewChild(MatSort) sort!: MatSort;


 
  ngOnInit(): void {
     this.initStores();
  }
 
  ngAfterViewInit() {
     this.initPaginator();
  }
 
  initStores(){
   debugger
     this.isLoading = true;
     this.store.dispatch(fetchDevices({pageNumber:this.currentPage,pageSize:10}));
     this.store.select('device').subscribe(
       (res: DeviceState) => {
       if(res && res.devices){
         this.devicesList = res.devices.map((device: any)=> ({
               id: device.id,
               type: device.type,
               description: device.description,
             }));
         this.dataSource.data = this.devicesList;
         this.dataSource.sort = this.sort;

         if (this.paginator) {
           this.paginator.length = res.totalItems;
           this.paginator.pageIndex = res.page - 1;
           this.paginator.pageSize = res.size;
         }
         this.isLoading = false;
       }
     }
     ,()=> this.isLoading = false
   );
  }
 
  initPaginator(){
     if(this.paginator){
       this.paginator.page.subscribe(pageEvent => {
         this.currentPage = pageEvent.pageIndex + 1;
         this.store.dispatch(fetchDevices({ pageNumber: this.currentPage, pageSize: pageEvent.pageSize }));
       });
     }
  }
  openUpdateDialog(device: Device): void {
    const dialogRef = this.dialog.open(DevicesCreationComponent, {
      width: '60%',
      data: device
   });
  
   dialogRef.afterClosed().subscribe(result => {   });
   }  
   
  openCreateDialog(){
    const dialogRef = this.dialog.open(DevicesCreationComponent, {
      width: '60%',
      data: null
   });
  
   dialogRef.afterClosed().subscribe(result => {   });
   }

  onSearchEvent(searchTerm: string | null){
    if(searchTerm)
      this.store.dispatch(searchDevicesByKeyword({keyword: searchTerm}));    
    else
      this.initStores();
  }
 }
 