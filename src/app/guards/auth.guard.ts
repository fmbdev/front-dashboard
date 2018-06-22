import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../providers/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authServ: AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authServ.userIsAuthenticated()){
        return true;
      }else{
        confirm("No tienes los permisos necesarios para acceder a esta página.");
        this.router.navigate(['/']);
        return false;
      }  
  }
}
