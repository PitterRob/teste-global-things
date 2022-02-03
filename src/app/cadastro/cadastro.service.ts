/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Hero } from './interfaces/cadastro.dto';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  //baseUrl = 'http://localhost:3000';
  baseUrl = 'https://heroes.globalthings.net/api';
  status: boolean;
  constructor(public http: HttpClient) {}

  public listarCategoria(): Observable<Category[]> {
    const headers = new HttpHeaders().set(
      'accessKey',
      '394772d23dfb455a9fc5ee31ce8ee53a'
    );
    return this.http.get<Category[]>(`${this.baseUrl}/Category`, {
      headers,
    });
  }

  public listarHerois(): Observable<Hero[]> {
    const headers = new HttpHeaders().set(
      'accessKey',
      '394772d23dfb455a9fc5ee31ce8ee53a'
    );
    return this.http.get<Hero[]>(`${this.baseUrl}/Heroes`, {
      headers,
    });
  }

  public salvarHeroi(hero: Hero): Observable<Hero> {
    const headers = new HttpHeaders().set(
      'accessKey',
      '394772d23dfb455a9fc5ee31ce8ee53a'
    );

    const body = JSON.stringify(hero);

    return this.http.post<Hero>(`${this.baseUrl}/Heroes`, body, { headers });
  }

  public salvarCategoria(categoria: Category): Observable<Category> {
    const headers = new HttpHeaders().set(
      'accessKey',
      '394772d23dfb455a9fc5ee31ce8ee53a'
    );

    const body = JSON.stringify(categoria);

    return this.http.post<Category>(`${this.baseUrl}/Category`, body, {
      headers,
    });
  }
}
