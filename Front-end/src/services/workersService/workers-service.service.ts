import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../model/login';
import { Registro } from '../../model/registro';
import { Worker } from '../../model/worker';

@Injectable({
  providedIn: 'root',
})
export class WorkersServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  login(worker: Login): Observable<any> {
    const url = 'http://localhost:3000/auth/login';
    const body = JSON.stringify(worker);
    return this.http.post<any>(url, body, this.httpOptions);
  }

  fichar(id: string, localizacion: any): Observable<any> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const urlFichar = `http://localhost:3000/register/fichar/${id}`;
    const body = JSON.stringify(localizacion);
    return this.http.post<any>(urlFichar, body, httpOptionsWithToken);
  }

  desFichar(id: string, localizacion: any): Observable<any> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const urlDesFichar = `http://localhost:3000/register/desfichar/${id}`;
    const body = JSON.stringify(localizacion);
    return this.http.put<any>(urlDesFichar, body, httpOptionsWithToken);
  }

  horariosWorker(id: string): Observable<Registro[]> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const urlHorariosWorker = `http://localhost:3000/register/tuRegistro/${id}`;
    return this.http.get<Registro[]>(urlHorariosWorker, httpOptionsWithToken);
  }

  allRegistros(): Observable<Registro[]> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const urlAllRegistros = `http://localhost:3000/register/tablaDeRegistros`;
    return this.http.get<Registro[]>(urlAllRegistros, httpOptionsWithToken);
  }

  allWorkers(): Observable<Worker[]> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const urlAllWorker = `http://localhost:3000/workers/getWorkers`;
    const data = this.http.get<Worker[]>(urlAllWorker, httpOptionsWithToken);
    return data;
  }

  editRegistro(registroId: string, editado: any): Observable<Registro[]> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const urleditRegistro = `http://localhost:3000/register/editarRegistro/${registroId}`;
    const body = JSON.stringify(editado);
    return this.http.put<any>(urleditRegistro, body, httpOptionsWithToken);
  }
  editRegistroEntrada(registroId: string, editado: any): Observable<Registro[]> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const urleditRegistro = `http://localhost:3000/register/editarRegistroEntrada/${registroId}`;
    const body = JSON.stringify(editado);
    return this.http.put<any>(urleditRegistro, body, httpOptionsWithToken);
  }
}
