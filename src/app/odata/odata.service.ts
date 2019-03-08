import { Injectable } from '@angular/core';
import { QueryStringBuilder } from './odata';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ODataService<T> {
  constructor(protected baseUrl: string, private http: HttpClient) {}

  get(callback: (queryBuilder: QueryStringBuilder) => void): Observable<T[]> {
    let queryString = '';
    if (callback) {
      const queryBuilder = new QueryStringBuilder();
      callback(queryBuilder);
      queryString = encodeURI(queryBuilder.build());
    }
    return <Observable<T[]>>(
      this.http
        .get(`${this.baseUrl}${queryString}`)
        .pipe(map(o => (o as any).value))
    );
  }

  protected getCollectionProperty(
    id: string | number,
    property: string,
    callback: (queryBuilder: QueryStringBuilder) => void
  ): Observable<T[]> {
    const queryBuilder = new QueryStringBuilder();
    callback(queryBuilder);
    const queryString = encodeURI(queryBuilder.build());
    return <Observable<T[]>>(
      this.http
        .get(`${this.baseUrl}/${id}/${property}${queryString}`)
        .pipe(map(o => (o as any).value))
    );
  }

  getWithCount(
    callback: (queryBuilder: QueryStringBuilder) => void
  ): Observable<{ count: number; value: T[] }> {
    const queryBuilder = new QueryStringBuilder();
    callback(queryBuilder);
    queryBuilder.count();
    const queryString = encodeURI(queryBuilder.build());
    return <Observable<{ count: number; value: T[] }>>(
      this.http.get(`${this.baseUrl}${queryString}`)
    );
  }

  all() {
    return this.http.get<T>(this.baseUrl).pipe(map(o => (o as any).value));
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  add(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(item: T, id: string | number): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: string | number) {
    return this.http.delete<T>(`${this.baseUrl}/${id}`);
  }
}
