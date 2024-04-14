import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  @Output() searchEvent = new EventEmitter<string | null>();
  @Input() debounceDuration: number = 300; 

  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
    .pipe(debounceTime(this.debounceDuration))
    .subscribe((searchText) => {
      this.searchEvent.emit(searchText || null);
    });
  }

}
