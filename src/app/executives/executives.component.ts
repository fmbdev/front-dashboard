import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'dash-executives',
  templateUrl: './executives.component.html',
  styleUrls: ['./executives.component.scss']
})
export class ExecutivesComponent implements OnInit {

  constructor(private authServ: AuthService) { }

  ngOnInit() {
    console.log(this.authServ.getRole());
  }

}
