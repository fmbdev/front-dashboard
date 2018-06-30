import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ExecutiveService } from '../providers/executive.service';
import { TablesService } from '../providers/tables.service';

@Component({
  selector: 'dash-executives',
  templateUrl: './executives.component.html',
  styleUrls: ['./executives.component.scss']
})
export class ExecutivesComponent implements OnInit {

  private id: number;
  private executive: any;
  private tables: any[];
  private tableFields: any[];
  private form: FormGroup;
  private message: String = '';
  private permissions: any;

  @ViewChild('msgcont') msgcont: ElementRef;
  @ViewChild('msgicon') msgicon: ElementRef;

  constructor(private route: ActivatedRoute,
              private renderer: Renderer2,
              private formBuilder: FormBuilder,
              private tablesServ: TablesService,
              private executiveServ: ExecutiveService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.executiveServ.getExecutivebyId(this.id).subscribe(
      (data: any) => {
        this.executive = data;
      }
    )
    
    this.tablesServ.getTables().subscribe(
      (data: any[]) => {
        this.tables = data;
      }
    );

    this.getPermissions();

    this.initForm();
  }

  onSubmit(){
    this.executiveServ.setExecuivePermissions(this.form.value).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.showMessageAuth(res.data.message, 'msg-success', 'fa-check-circle');
          setTimeout(() => {
            this.renderer.addClass(this.msgcont.nativeElement, 'hidden');
            this.form.reset();
            this.initForm();
          },2500)
        }
      },
      (err: any) => {
        this.showMessageAuth(err.data.message, 'msg-error', 'fa-times-circle');
      }
    )
  }

  showTableFields(table: string){
    this.tablesServ.getTableFields(table).subscribe(
      (data: any[]) => {
        this.tableFields = data;
      }
    )
  }

  delete(id: number){
    let answer = confirm("¿Esta seuro de querer eliminar este permiso?");
    if(answer){
      this.executiveServ.deleteExecutivePermission(id).subscribe(
        (res: any) => {
          if(res.status === 200){
            this.getPermissions();
          }
        }
      )
    }
  }

  reloadTableData(){
    this.getPermissions();
  }

  private getPermissions(){
    this.executiveServ.getExecutivePermissions(this.id).subscribe(
      (data: any) => {
        this.permissions = data.permissions;
      }
    )
  }

  private showMessageAuth(message: string, msg_class: string, icon_class: string) {
    let actual_msg_class: string;
    let actual_icon_class: string;

    this.message = message;
    this.renderer.removeClass(this.msgcont.nativeElement, 'hidden');

    if (this.msgcont.nativeElement.classList.contains('msg-success')) {
      actual_msg_class = 'msg-success';
    } else {
      actual_msg_class = 'msg-error';
    }

    if (actual_msg_class) {
      this.renderer.removeClass(this.msgcont.nativeElement, actual_msg_class);
    }

    this.renderer.addClass(this.msgcont.nativeElement, msg_class);

    if (this.msgicon.nativeElement.classList.contains('fa-check-circle')) {
      actual_icon_class = 'fa-check-circle';
    } else {
      actual_icon_class = 'fa-times-circle';
    }

    if (actual_icon_class) {
      this.renderer.removeClass(this.msgicon.nativeElement, actual_icon_class);
    }

    this.renderer.addClass(this.msgicon.nativeElement, actual_icon_class);
  }

  private initForm(){
    this.form = this.formBuilder.group({
      table: ['', Validators.required],
      fields: ['', Validators.required],
      executiveId: [this.id]
    });
  }

}
