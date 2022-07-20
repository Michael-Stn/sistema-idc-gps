import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alerts } from '../../models/alerts.model';
import { ResponseAPI } from '../../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private http: HttpClient) {}

  public get(): Observable<ResponseAPI<Alerts[]>> {
    return this.http.get<ResponseAPI<Alerts[]>>(`${environment.alerts_base_url}?limit=10&order=desc`);
  }
}
