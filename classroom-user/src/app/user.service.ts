import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './shared/model/user';
import { Role } from './shared/model/role';
import { createUser } from './shared/model/createUser';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  endPoint: string = environment.api;

  constructor(private http: HttpClient) { }

  getTableHeader() {
    return this.http.get('/assets/headers.json');
  }

  getUserRoles(token: string): Observable<Role[]> {
    const headers = new HttpHeaders()
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    const urlApi = `${this.endPoint}/role`;
    return this.http.get<Role[]>(urlApi, { headers })
      .pipe(
        catchError(this.handleError<Role[]>('roles', []))
      );
  }

  getUsers(token: string, filter: string): Observable<User[]> {
    const headers = new HttpHeaders()
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    const urlApi = `${this.endPoint}/user?filter=${filter}&sort=name:asc&search`;
    return this.http.get<User[]>(urlApi, { headers })
      .pipe(
        catchError(this.handleError<User[]>('users', []))
      );
  }

  create(token: string, body: createUser): any {
    const urlApi = `${this.endPoint}/auth/signup`;
    const headers = new HttpHeaders()
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    return this.http.post<any>(urlApi, body, { headers })
      .pipe(
        catchError(this.handleError<any>('create', []))
      );
  }

  delete(token: string, id): any {
    const headers = new HttpHeaders()
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    const urlApi = `${this.endPoint}/user?id=${id}`;
    return this.http.delete<object[]>(urlApi, { headers })
      .pipe(
        catchError(this.handleError<object[]>('delete', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('failed: ', error.message);
      return of(result as T);
    };
  }
}
