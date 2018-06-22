import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'dash-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authServ: AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authServ.userLogout();
  }

}
