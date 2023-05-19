import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, pluck, mergeMap, filter, toArray, share, tap, catchError, retry } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherResponse {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    }
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService
  ) {}

  getForecast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', coords.latitude)
            .set('lon', coords.longitude)
            .set('units', 'metric')
            .set('appid', '80443720125254880463e392be27f15c')
        }),
        switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params: params })),
        // get only the 'list' array of objects from the response
        pluck('list'),
        // create an observable for each object from the 'list' array
        mergeMap(value => of(...value)),
        // filter to only get every 8th record from the total of 40, that means 5 records
        filter((value, index) => index % 8 === 0),
        map(value => {
          return {
            dateString: value.dt_txt,
            temp: value.main.temp
          };
        }),
        // cast the observable as an array
        toArray(),
        // cast the observable only one time to multiple subscribers
        share()
      );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(1),
      tap(() => {
        this.notificationsService.addSuccess('Got your location');
      }),
      catchError((err) => {
        // #1 - Handle the error
        this.notificationsService.addError('Failed to get your location');

        // #2 - Return a new observable
        return throwError(err);
      })
    );
  }
}
