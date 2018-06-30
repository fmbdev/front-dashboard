import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../providers/auth.service';
import { TablesService } from '../providers/tables.service';

@Component({
  selector: 'dash-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  private tables: any[];
  private dataTable: any[];
  private tableForm: FormGroup;

  constructor(private router: Router,
              private authServ: AuthService,
              private tablesServ: TablesService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initTableForm();
    this.tables = [];
    let role = this.authServ.getRole();

    if(role == '1' || role == '2'){
      this.tablesServ.getTables().subscribe(
        (data: any[]) => {
          this.tables = data;
        }
      );   
    }else if(role == '3'){
      let permissions: any[] = JSON.parse(this.authServ.getPermissions());
      for(let i = 0; i < permissions.length; i++){
        this.tables.push({'name': permissions[i].table})
      }
    }
   
  }

  selectTable(table: string){
    if(table != ""){
      this.tablesServ.getTableInfo(table).subscribe(
        (data: any) => {
          this.dataTable = data;
        }
      )
    }
  }

  sendTableToForm(table, id){
    this.router.navigate(['tablesform', table, id]);
  }

  private initTableForm(){
    this.tableForm = this.formBuilder.group({
      table: ['', Validators.required]
    });
  }

}
