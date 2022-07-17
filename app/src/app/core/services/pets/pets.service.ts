import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../../models/response.model';
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
}
