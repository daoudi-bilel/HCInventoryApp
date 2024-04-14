import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingScreenService {
  loadingScreenSubject = new Subject<boolean>();

  show() {
    this.loadingScreenSubject.next(true);
  }

  hide() {
    this.loadingScreenSubject.next(false);
  }
}
