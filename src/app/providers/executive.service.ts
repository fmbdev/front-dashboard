import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';

import { AuthService } from '../providers/auth.service';

import { pipe } from 'rxjs';
import { map, } from 'rxjs/operators';
import 'rxjs';

@Injectable()
export class ExecutiveService {

  private token: string = "";
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
    );
  }

}
