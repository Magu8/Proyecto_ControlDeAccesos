import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../../model/tarea';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  allTasks(): Observable<any> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const urlAllRegistros = `http://localhost:3000/tasks`;
    return this.http.get<Tarea[]>(urlAllRegistros, httpOptionsWithToken);
  }

  moverTarea(worker: string, task: string): Observable<any> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };

    const urleditTask = `http://localhost:3000/tasks/addResposible/${worker}/${task}`;
    return this.http.put<any>(urleditTask, {}, httpOptionsWithToken);
  }

  newTask(descripcion: string): Observable<any> {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const desc = {
      descripcion: descripcion
    }
    const url = "http://localhost:3000/tasks/addTask"
    const body = JSON.stringify(desc);
    return this.http.post<Tarea>(url, body, httpOptionsWithToken)
  }

  deleteTask(id: string): Observable<any> {
    //en<> dices que tipo de dato te va a devolver
    console.log("pepe");
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    const url = `http://localhost:3000/tasks/deleteTask/${id}`;
    return this.http.delete<any>(url, httpOptionsWithToken);

  }
  tusTareas(id: string) {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    }
    const url = `http://localhost:3000/tasks/count/${id}`;
    return this.http.get<any>(url, httpOptionsWithToken);
  }
}



