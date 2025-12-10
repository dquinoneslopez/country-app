import { Component, EventEmitter, input, output, Output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input<string>('Search...');
  search = output<string>();

  OnSearch(value: string): void {
    this.search.emit(value);
  }
}
