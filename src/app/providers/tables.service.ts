import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';

import { AuthService } from '../providers/auth.service';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { map, tap, catchError } from 'rxjs/operators';
import 'rxjs';

@Injectable()
export class TablesService {

  private tables: any[] = [];
  private token: string = "";
  private registers: any[];

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authServ: AuthService) { 
    this.token = this.authServ.getToken(); 
  }

  getTables(){
    return this.http.get('http://localhost:8000/api/tables?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json();
        }
      )
    )
  }

  getTableInfo(table: string){
    this.registers = [];

    return this.http.get('http://localhost:8000/api/infotable/'+table+'?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json();
        }
      ),
      tap(
        (data: any[]) => {
          this.registers = data;
        }
      )   
    );
  }

  getRegisterTableById(table: string, id: string){
    return this.http.get('http://localhost:8000/api/registertable/'+table+'/'+id+'?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json();
        }
      )
    )
  }

  getTableFields(table: string){
    return this.http.get('http://localhost:8000/api/fieldstable/'+table+'?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json()
        }
      )
    )
  }

  updateRegisterByTable(table: string, registerId: string, values: any){
    const data = JSON.stringify({ table: table, registerId: registerId, formValues: JSON.stringify(values) });
    return this.http.post('http://localhost:8000/api/updatetables?token='+this.token, data, {headers: this.headers}).pipe(
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
