import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../providers/auth.service';
import { TablesService } from '../providers/tables.service';
import { LeadsService } from '../providers/leads.service';

@Component({
  selector: 'dash-leads-form',
  templateUrl: './leads-form.component.html',
  styleUrls: ['./leads-form.component.scss']
})
export class LeadsFormComponent implements OnInit {

  private id: string= "";
  private data: any;
  private form: FormGroup;
  private message: String = "";
  private tipifications: any;
  private fieldsTable: string[] = [];

  @ViewChild('msgcont') msgcont: ElementRef;
  @ViewChild('msgicon') msgicon: ElementRef;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authServ: AuthService,
              private renderer: Renderer2,
              private tableServ: TablesService,
              private leadServ: LeadsService) { }

  ngOnInit() {
    this.initForm();
    let role = this.authServ.getRole();

    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.leadServ.getRegisterLeadById(this.id).subscribe(
      (data: any) => {
        this.data = data;
        this.setIniValuesForm();
      }
    );

    if(role == '1'){
      this.enabledAllFields();
    }else if(role == '3'){
      this.enabledFieldsByPermissions();
    }
  }

  onSubmit(){
    this.tableServ.updateRegisterByTable('leads', this.id, this.form.getRawValue()).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.showMessageAuth(res.data.message, 'msg-success', 'fa-check-circle');
          setTimeout(() => {
            this.router.navigate(['/leads']);
          },2500)
        }
      },
      (err: any) => {
        this.showMessageAuth(err.data.message, 'msg-error', 'fa-times-circle');
      }
    )
  }

  changeViable(value: string){
    if(value.toUpperCase() == "SI"){
      this.changeDataIsViable();
    }else{
      this.changeDataIsNotViable();
    }
  }

  private checkIsViable(){
    if(this.data.Viable !=""){
      if(this.data.Viable.toUpperCase() == "SI"){
        this.form.controls['Viable'].setValue('SI');
        this.changeDataIsViable();
      }else{
        this.form.controls['Viable'].setValue('NO');
        this.changeDataIsNotViable();
      }
    }
  }

  private changeDataIsViable(){
    this.tipifications = [
      { option: 'En seguimiento' },
      { option: 'Aparto' },
      { option: 'No le gusto el desarrollo / las casas' },
      { option: 'Otro' }
    ]
  }

  private changeDataIsNotViable(){
    this.tipifications = [
      { option: 'No puede con enganche' },
      { option: 'No es titular' },
      { option: 'Mal buró / Sin score' },
      { option: 'Crédito no autorizado' },
      { option: 'Sin documentos' },
      { option: 'No califica' },
      { option: 'Problemas con gestion' },
      { option: 'No puede con la mensualidad' },
      { option: 'Otro' }
    ]
  }

  private enabledAllFields(){
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].enable();
    });
  }

  private enabledFieldsByPermissions(){
    this.form.controls['Viable'].enable();
    this.form.controls['Tipificacion'].enable();
    this.form.controls['Comentarios'].enable();
    
    this.getPermissionsFieldsByTable();
    Object.keys(this.form.controls).forEach(key => {
      if(this.fieldsTable.length > 0){
        for(let i = 0; i < this.fieldsTable.length; i++){
          if(key.toUpperCase() == this.fieldsTable[i].toUpperCase()){
            this.form.controls[key].enable();
          }
        }
      }
    });
  }

  private getPermissionsFieldsByTable() {
    let tablePermission: any;
    let permissions = JSON.parse(this.authServ.getPermissions());

    if(permissions){
      for(let i = 0; i < permissions.length; i++){
        if(permissions[i].table.toUpperCase() == 'LEADS'){
          tablePermission = permissions[i];
        }
      }
      this.fieldsTable = tablePermission.fields.split(', ');
    }
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

  private setIniValuesForm(){
    this.form.controls['Nombre'].setValue(this.data.Nombre);
    this.form.controls['Apellidos'].setValue(this.data.Apellidos);
    this.form.controls['Telefono'].setValue(this.data.Telefono);
    this.form.controls['Celular'].setValue(this.data.Celular);
    this.form.controls['Email'].setValue(this.data.Email);
    this.form.controls['FechaNacimiento'].setValue(this.data.FechaNacimiento);
    this.form.controls['FechaCreacion'].setValue(this.data.FechaCreacion);
    this.form.controls['DesarrolloInteres'].setValue(this.data.DesarrolloInteres);
    this.form.controls['OtraTipificacion'].setValue(this.data.OtraTipificacion);
    this.form.controls['Comentarios'].setValue(this.data.Comentarios);

    this.checkIsViable();
  }
  
  private initForm(){
    this.form = this.formBuilder.group({
      Nombre: [{value: '', disabled: true}, Validators.required],
      Apellidos: [{value: '', disabled: true}, Validators.required],
      Telefono: [{value: '', disabled: true}, Validators.required],
      Celular: [{value: '', disabled: true}, Validators.required],
      Email: [{value: '', disabled: true}, Validators.required],
      FechaNacimiento: [{value: '', disabled: true}, Validators.required],
      Semana: [{value: '', disabled: true}, Validators.required],
      Viable: [{value: '', disabled: true}, Validators.required],
      FechaCreacion: [{value: '', disabled: true}, Validators.required],
      DesarrolloInteres: [{value: '', disabled: true}, Validators.required],
      Tipificacion: [{value: '', disabled: true}, Validators.required],
      OtraTipificacion: [{value: '', disabled: true}, Validators.required],
      Comentarios: [{value: '', disabled: true}, Validators.required]
    });
  }

}
