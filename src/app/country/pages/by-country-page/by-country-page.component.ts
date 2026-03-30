import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) {
        return [];
      }
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query),
      );
    },
  });

  /* isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Array<Country>>([]);

  OnSearch(query: string): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService
      .searchByCountry(query)
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
