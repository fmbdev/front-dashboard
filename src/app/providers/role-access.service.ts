import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleAccessService {

  constructor(private router: Router,
              private authServ: AuthService) { }

  accessByRole(){
    let role = this.authServ.getRole();
    if(role == '1'){
      this.router.navigate(['executive-list']);
    }else if(role == '2' || role == '3'){
      this.router.navigate(['tables']);
    }
  }
}
