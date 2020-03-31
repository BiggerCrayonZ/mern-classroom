import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { User } from './shared/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  endPoint: string = environment.api;

  constructor(private http: HttpClient) {}

  getUsers(token: string, filter: string): Observable<User[]>{
    const headers = new HttpHeaders()
      .set('x-access-token', token)
      .set('Content-Type', 'application/json');
    const urlApi = `${this.endPoint}/user?filter=${filter}&sort=name:asc&search`;
    console.log({ urlApi });
    return this.http.get<User[]>(urlApi, { headers })
      .pipe(
        catchError(this.handleError<User[]>('users', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('failed: ', error.message);
      return of(result as T);
    };
  }
}
