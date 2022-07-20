import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../../models/response.model';
import { Tracks } from '../../models/tracks.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  constructor(private http: HttpClient) {}

  public getLast(code: string): Observable<ResponseAPI<Tracks[]>> {
    return this.http.get<ResponseAPI<Tracks[]>>(
      `${environment.tracks_base_url}/${code}?limit=1&order=desc`
    );
  }
}
