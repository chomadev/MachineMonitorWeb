import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemCheck } from '../models/system-check';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemCheckService {
  private apiUrl = `${environment.apiUrl}/api/systemcheck`;

  constructor(private http: HttpClient) { }

  getLatestSystemCheck(key: string): Observable<SystemCheck> {
    return this.http.get<SystemCheck>(`${this.apiUrl}/latest?apiKey=${key}`);
  }
} 