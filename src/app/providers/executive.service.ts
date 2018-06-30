import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';

import { AuthService } from '../providers/auth.service';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { map, catchError } from 'rxjs/operators';
import 'rxjs';

@Injectable()
export class ExecutiveService {

  private token: string = "";
  private executives: any[];
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authServ: AuthService) { 
    this.token = this.authServ.getToken(); 
  }

  getExecutives(){
    return this.http.get('http://localhost:8000/api/executives?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json();
        }
      )
    )
  }

  getExecutivebyId(id: number){
    return this.http.get('http://localhost:8000/api/executives/'+id+'?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json();
        }
      )
    )
  }

  setExecuivePermissions(values){
    const data = JSON.stringify({ table: values.table, fields: values.fields, executiveId: values.executiveId });
    return this.http.post('http://localhost:8000/api/permissions?token='+this.token, data, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return {status: res.status, data: res.json()};
        }
      ),
      catchError(err => {
        return ErrorObservable.create({status: err.status, data: err.json()});
      })
    )
  }

  getExecutivePermissions(id: number){
    return this.http.get('http://localhost:8000/api/permissions/'+id+'?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json();
        }
      )
    )
  }

  deleteExecutivePermission(id: number){
    return this.http.get('http://localhost:8000/api/deletepermission/'+id+'?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return {status: res.status, data: res.json()};
        }
      ),
      catchError(err => {
        return ErrorObservable.create({status: err.status, data: err.json()});
      })
    )
  }

}
