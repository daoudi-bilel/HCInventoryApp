import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from '@appServices/loading-screen/loading-screen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
 ],
})
export class AppComponent implements OnInit{

  title = 'HCInventoryApp';
  isLoading: boolean = false;
  constructor(private loadingScreenService: LoadingScreenService){}

  ngOnInit(): void {
    this.loadingScreenService.loadingScreenSubject.subscribe(
      (value) => (this.isLoading = value)
    );
  }
}
