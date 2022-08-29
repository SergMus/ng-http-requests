import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError, map } from 'rxjs';

export interface Todo {
  id?: any;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  addOne(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(
      'https://jsonplaceholder.typicode.com/todos',
      todo,
      {
        headers: new HttpHeaders({
          customHeader: 'headerInfo',
        }),
      }
    );
  }

  fetchAll(): Observable<Todo[]> {
    let params = new HttpParams();
    params = params.append('_limit', '5');
    params = params.append('queryParam', 'queryInfo');

    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
        params,
        // observe: 'response',
        // params: new HttpParams().set('_limit', '5'),
      })
      .pipe(
        delay(1000)
        // catchError((err) => {
        //   return throwError(err);
        // })
      );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }

  complete(id: number): Observable<Todo> {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        completed: true,
      }
    );
  }
}
