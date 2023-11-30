import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Country} from "../types/country";

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private dataUrl = 'assets/country/countries.json';

    constructor(private http: HttpClient) {
    }

    //READ
    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(this.dataUrl);
    }

    getCountryByName(name: string): Observable<Country | undefined> {
        return this.getCountries().pipe(
            map(countries => countries.find(country => country.name === name))
        );
    }
}
