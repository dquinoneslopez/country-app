import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Array<Country>> {
    const lowerQuery = query.toLowerCase();
    const url = `${API_URL}/capital/${lowerQuery}`;

    return this.http.get<Array<RESTCountry>>(url).pipe(
      map((restCountries: Array<RESTCountry>) =>
        CountryMapper.maptRestCountryArrayToCountryArray(restCountries),
      ),
      catchError((err) => {
        return throwError(() => new Error(`Capital not found (${query})`));
      }),
    );
  }

  searchByCountry(query: string): Observable<Array<Country>> {
    const lowerQuery = query.toLowerCase();
    const url = `${API_URL}/name/${lowerQuery}`;

    return this.http.get<Array<RESTCountry>>(url).pipe(
      map((restCountries: Array<RESTCountry>) =>
        CountryMapper.maptRestCountryArrayToCountryArray(restCountries),
      ),
      catchError((err) => {
        return throwError(() => new Error(`Country not found (${query})`));
      }),
    );
  }
}
