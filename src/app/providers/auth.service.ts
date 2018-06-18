import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { User } from '../interfaces/user';

import { pipe, Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { map, catchError } from 'rxjs/operators';
import 'rxjs';


@Injectable()
export class AuthService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  userRegister(user: User) {
    const data = JSON.stringify({email: user.email, password: user.password});

    return this.http.post('http://localhost:8000/api/auth/register', data, {headers: this.headers}).pipe(
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

    return this.http.post('http://localhost:8000/api/auth/login', data, {headers: this.headers}).pipe(
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

}
