import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../../models/response.model';
import { Configs } from '../../models/configs.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigsService {
  constructor(private http: HttpClient) {}

  public get(): Observable<ResponseAPI<Configs[]>> {
    return this.http.get<ResponseAPI<Configs[]>>(
      environment.configs_base_url
    );
  }
}