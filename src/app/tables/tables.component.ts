import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
              private tablesServ: TablesService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initTableForm();

    this.tables = [];
    this.tablesServ.getTables().subscribe(
      (data: any[]) => {
        this.tables = data;
      }
    )
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

  sendTableToForm(name, id){
    let params: NavigationExtras = {
      queryParams: {
        'table': name,
        'register_id': id
      }
    }
    this.router.navigate(['tablesform'], params);
  }

  private initTableForm(){
    this.tableForm = this.formBuilder.group({
      table: ['', Validators.required]
    });
  }

}
