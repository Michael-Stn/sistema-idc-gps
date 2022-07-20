import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPI, ResponseUpdate } from '../../models/response.model';
import { Pets } from '../../models/pets.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private http: HttpClient) {}

  public get(): Observable<ResponseAPI<Pets[]>> {
    return this.http.get<ResponseAPI<Pets[]>>(environment.pets_base_url);
  }

  public getByCode(code: string): Observable<ResponseAPI<Pets>> {
    return this.http.get<ResponseAPI<Pets>>(
      environment.pets_base_url + `/${code}`
    );
  }

  public create(data: any): Observable<ResponseAPI<Pets[]>> {
    return this.http.post<ResponseAPI<Pets[]>>(environment.pets_base_url, data);
  }

  public update(
    code: string,
    data: any
  ): Observable<ResponseAPI<ResponseUpdate>> {
    return this.http.put<ResponseAPI<ResponseUpdate>>(
      `${environment.pets_base_url}/${code}`,
      data
    );
  }

  public delete(code: string): Observable<ResponseAPI<ResponseUpdate>> {
    return this.http.put<ResponseAPI<ResponseUpdate>>(
      `${environment.pets_base_url}/${code}`,
      { deleted: true }
    );
  }
}
