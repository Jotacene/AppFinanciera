import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  url = 'https://mindicador.cl/api'
  constructor(private http:HttpClient) {}

  getIndicadores(): Observable<any> {
    let data = this.http.get(this.url)
    return data
  }

  getIndicador(tipo: String): Observable<any> {
    let url = this.url + '/' + tipo
    let data = this.http.get(url)
    return data
  }
}
