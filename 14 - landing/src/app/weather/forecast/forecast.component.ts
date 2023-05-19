import { Component } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

interface ForecastServiceResponse {
  dateString: string,
  temp: number
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  forecast$: Observable<ForecastServiceResponse[]>;

  constructor(private forecastService: ForecastService) {
    this.forecast$ = this.forecastService.getForecast();
  }
}
