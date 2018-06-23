import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';

import { AuthService } from '../providers/auth.service';

import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import 'rxjs';

@Injectable()
export class LeadsService {

  private token: string = "";
  private registers: any[];

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authServ: AuthService) {
    this.token = this.authServ.getToken(); 
  }

  getLeads(){
    return this.http.get('http://localhost:8000/api/leads?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json()
        }
      ),
      tap(
        (data: any[]) => {
          this.registers = data
        }
      )
    )
  }

  getRegisterLeadById(id: string){
    for(let i = 0; i < this.registers.length; i++){
      if(this.registers[i].id == id){
        return this.registers[i];
      }
    }
  }

}
