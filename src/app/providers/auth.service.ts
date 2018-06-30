import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response} from '@angular/http';

import { User } from '../interfaces/user';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { map, catchError, tap } from 'rxjs/operators';
import 'rxjs';


@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private router: Router,
              private http: Http) { }

  userRegister(user: User) {
    const data = JSON.stringify({email: user.email, password: user.password});
    /*http://localhost:8000/api/auth/register*/
    return this.http.post('https://app.fmb.agency/api/auth/register', data, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return {status: res.status, data: res.json()};
        }
      ),
      catchError(err => {
        return ErrorObservable.create({status: err.status, data: err.json()});
      })
    );
  }

  userLogin(user: User) {
    const data = JSON.stringify({email: user.email, password: user.password});

    return this.http.post('https://app.fmb.agency/api/auth/login', data, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return {status: res.status, data: res.json()};
        }
      ),
      tap(
        (data) => {
          let permission: any[] = [];

          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user_id', data.data.user.id);
          localStorage.setItem('user_email', data.data.user.email);
          localStorage.setItem('user_role', data.data.user.roles[0].id);
          for(let i = 0; i < data.data.user.permissions.length; i++){
            permission.push(data.data.user.permissions[i]);
          }
          localStorage.setItem('permissions', JSON.stringify(permission));
        }
      ),
      catchError(err => {
        return ErrorObservable.create({status: err.status, data: err.json()});
      })
    );
  }

  userLogout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  userIsAuthenticated(): boolean{
    return this.getToken() ? true : false;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRole(){
    return this.userIsAuthenticated() ? localStorage.getItem('user_role') : 'null';
  }

  getUser(){
    return this.userIsAuthenticated() ? localStorage.getItem('user_email') : 'null';
  }

  getUserId(){
    return this.userIsAuthenticated() ? localStorage.getItem('user_id') : 'null';
  }

  getPermissions(){
    return this.userIsAuthenticated() ? localStorage.getItem('permissions') : 'null';
  }

}
