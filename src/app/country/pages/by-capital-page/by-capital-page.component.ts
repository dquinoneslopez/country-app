import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) {
        return of([]);
      }
      return this.countryService.searchByCapital(request.query);
    },
  });

  // With resource
  /* countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) {
        return [];
      }
      return await firstValueFrom(
        this.countryService.searchByCapital(request.query),
      );
    },
  }); */

  /* 

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Array<Country>>([]);

  OnSearch(query: string): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService
      .searchByCapital(query)
      .pipe(
        tap((countries) => {
          this.countries.set(countries);
          this.isLoading.set(false);
        }),
        catchError((err) => {
          this.isLoading.set(false);
          this.isError.set(
            err.message || 'An error occurred while searching for countries.',
          );
          return [];
        }),
      )
      .subscribe();
  } */
}
