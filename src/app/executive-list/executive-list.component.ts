import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { ExecutiveService } from '../providers/executive.service';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'dash-executive-list',
  templateUrl: './executive-list.component.html',
  styleUrls: ['./executive-list.component.scss']
})
export class ExecutiveListComponent implements OnInit {

  private executives: any[];
  constructor(private router: Router,
              private authServ: AuthService,
              private executiveServ: ExecutiveService) { }

  ngOnInit() {
    const role = this.authServ.getRole();

    this.executiveServ.getExecutives().subscribe(
      (data: any[]) => {
        this.executives = data;
      }
    )
  }

  showExecutive(id: number){
    this.router.navigate(['executives', id]);
  }

}
