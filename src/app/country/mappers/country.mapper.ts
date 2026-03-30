import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-country.interface';

export class CountryMapper {
  static maptRestCountrytoCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(', '),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags?.svg || '',
      name: restCountry.name.common,
      population: restCountry.population,
      region: restCountry.region,
    };
  }

  static maptRestCountryArrayToCountryArray(
    restCountries: Array<RESTCountry>
  ): Array<Country> {
    return restCountries.map((restCountry) =>
      this.maptRestCountrytoCountry(restCountry)
    );
  }
}
