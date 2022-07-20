import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPI, ResponseUpdate } from '../../models/response.model';
import { Configs } from '../../models/configs.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigsService {
  constructor(private http: HttpClient) {}

  public get(): Observable<ResponseAPI<Configs>> {
    return this.http.get<ResponseAPI<Configs>>(environment.configs_base_url);
  }

  public update(data: any): Observable<ResponseAPI<ResponseUpdate>> {
    return this.http.put<ResponseAPI<ResponseUpdate>>(
      environment.configs_base_url,
      data
    );
  }

  public create(data: any): Observable<ResponseAPI<ResponseUpdate>> {
    return this.http.post<ResponseAPI<ResponseUpdate>>(
      environment.configs_base_url,
      data
    );
  }
}
