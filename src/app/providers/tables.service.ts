import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';

import { AuthService } from '../providers/auth.service';

import { pipe } from 'rxjs';
import { map, tap, } from 'rxjs/operators';
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

    return this.http.get('http://localhost:8000/api/table/'+table+'?token='+this.token, {headers: this.headers}).pipe(
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

  getRegisterTableById(id: string){
    if(this.registers){
      for(let i = 0; i < this.registers.length; i++){
        if(this.registers[i].id == id){
          return this.registers[i];
        }
      }
    }
  }

}
