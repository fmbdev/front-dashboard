import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';

import { AuthService } from '../providers/auth.service';
import { WeekOfYearPipe } from '../pipes/week-of-year.pipe';

import { map, tap } from 'rxjs/operators';
import 'rxjs';

@Injectable()
export class LeadsService {

  private token: string = "";
  private registers: any[];

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, 
              private authServ: AuthService,
              private weekPipe: WeekOfYearPipe) {
    this.token = this.authServ.getToken(); 
  }

  getLeads(){
    /*http://localhost:8000/api/leads?token=*/
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

  getAllLeads(){
    return this.registers;
  }

  getRegisterLeadById(id: string){
    return this.http.get('http://localhost:8000/api/leads/'+id+'?token='+this.token, {headers: this.headers}).pipe(
      map(
        (res: Response) => {
          return res.json();
        }
      )
    )
  }

  getLeadsByFilter(filter: string, valueField: string){
    let leadsByilter = [];
    if(filter.toLowerCase() != 'semana'){
      for(let i = 0; i < this.registers.length; i++){
        if(this.registers[i][filter].toLowerCase().indexOf(valueField.toLowerCase()) != -1){
          leadsByilter.push(this.registers[i])
        }
      }
    }else{
      for(let i = 0; i < this.registers.length; i++){
        let week = this.weekPipe.transform(this.registers[i]['FechaCreacion']);
        if(week == valueField){
          leadsByilter.push(this.registers[i])
        }
      }
    }
    return leadsByilter;
  }


}
