import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../providers/auth.service';
import { TablesService } from '../providers/tables.service';

@Component({
  selector: 'dash-tables-form',
  templateUrl: './tables-form.component.html',
  styleUrls: ['./tables-form.component.scss']
})
export class TablesFormComponent implements OnInit {

  private table: string = "";
  private id: string= "";
  private data: any;
  private form: FormGroup;
  private message: String = "";
  private fieldsTable: string[] = [];

  @ViewChild('msgcont') msgcont: ElementRef;
  @ViewChild('msgicon') msgicon: ElementRef;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authServ: AuthService,
              private renderer: Renderer2,           
              private tableServ: TablesService) { }

  ngOnInit() {
    let role = this.authServ.getRole();

    this.initForm();

    this.route.params.subscribe(params => {
      this.table = params['table'];
      this.id = params['id']
    });

    this.tableServ.getRegisterTableById(this.table, this.id).subscribe(
      (data: any) => {
        this.data = data;
        this.setIniValuesForm();
      }
    )

    if(role == '1'){
      this.enabledAllFields();
    }else if(role == '3'){
      this.enabledFieldsByPermissions();
    }
  }

  onSubmit(){
    this.tableServ.updateRegisterByTable(this.table, this.id, this.form.getRawValue()).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.showMessageAuth(res.data.message, 'msg-success', 'fa-check-circle');
          setTimeout(() => {
            this.router.navigate(['/tables']);
          },2500)
        }
      },
      (err: any) => {
        this.showMessageAuth(err.data.message, 'msg-error', 'fa-times-circle');
      }
    )
  }

  private checkHasEmail(){
    if(this.data.Tiene_Correo != ""){
      if(this.data.Tiene_Correo.toUpperCase() == "SI"){
        this.form.controls['Tiene_Correo'].setValue('SI');
      }else{
        this.form.controls['Tiene_Correo'].setValue('NO');
      }
    }
  }

  private checkTipeClient(){
    if(this.data.Cliente != ""){
      if(this.data.Cliente.toUpperCase() == "CITA"){
        this.form.controls['Cliente'].setValue('CITA');
      }else{
        this.form.controls['Cliente'].setValue('PASE');
      }
    }
  }

  private setMedioType(){
    if(this.data.Medio_mkt !=""){
      this.form.controls['Medio_especifico'].setValue(this.data.Medio_mkt);
    }else if(this.data.Medio_promocion !=""){
      this.form.controls['Medio_especifico'].setValue(this.data.Medio_promocion);
    }else if(this.data.Medio_ventas !=""){
      this.form.controls['Medio_especifico'].setValue(this.data.Medio_ventas);
    }else if(this.data.Medio_citamkt){
      this.form.controls['Medio_especifico'].setValue(this.data.Medio_citamkt);
    }
  }

  private enabledAllFields(){
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].enable();
    });
  }

  private enabledFieldsByPermissions(){
    this.form.controls['Viable'].enable();
    this.form.controls['Comentarios'].enable();

    this.getPermissionsFieldsByTable();
    if(this.fieldsTable.length > 0){
      Object.keys(this.form.controls).forEach(key => {
       for(let i = 0; i < this.fieldsTable.length; i++){
          if(key.toUpperCase() == this.fieldsTable[i].toUpperCase()){
              this.form.controls[key].enable();
          }
        }
      });
    }
  }

  private getPermissionsFieldsByTable() {
    let tablePermission: any;
    let permissions = JSON.parse(this.authServ.getPermissions());

    if(permissions){
      for(let i = 0; i < permissions.length; i++){
        if(permissions[i].table.toUpperCase() == permissions[i].table.toUpperCase()){
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
    this.form.controls['Fecha_Nacimiento'].setValue(this.data.Fecha_Nacimiento);
    this.form.controls['Telefono_Casa'].setValue(this.data.Telefono_Casa);
    this.form.controls['Telefono_Celular'].setValue(this.data.Telefono_Celular);
    this.form.controls['Email'].setValue(this.data.Email);
    this.form.controls['Lugar_Trabajo'].setValue(this.data.Lugar_Trabajo);
    this.form.controls['Ciudad'].setValue(this.data.Ciudad);
    this.form.controls['Colonia'].setValue(this.data.Colonia);
    this.form.controls['Estado_Civil'].setValue(this.data.Estado_Civil);
    this.form.controls['Asesor_Contacto'].setValue(this.data.Asesor_Contacto);
    this.form.controls['Vendedor_atendera'].setValue(this.data.Vendedor_atendera);
    this.form.controls['Medio_gral'].setValue(this.data.Medio_gral);
    this.form.controls['Valor_Vivienda'].setValue(this.data.Valor_Vivienda);
    this.form.controls['Tipo_Ingreso'].setValue(this.data.Tipo_Ingreso);
    this.form.controls['Ingreso_MXN'].setValue(this.data.Ingreso_MXN);
    this.form.controls['Viable'].setValue(this.data.Viable);
    this.form.controls['Fecha_Registro'].setValue(this.data.Fecha_Registro);
    this.form.controls['Comentarios'].setValue(this.data.Comentarios);

    this.checkHasEmail()
    this.checkTipeClient();
    this.setMedioType();
  }

  private initForm(){
    this.form = this.formBuilder.group({
      Nombre: [{value: '', disabled: true}, Validators.required],
      Fecha_Nacimiento: [{value: '', disabled: true}, Validators.required],
      Telefono_Casa: [{value: '', disabled: true}, Validators.required],
      Telefono_Celular: [{value: '', disabled: true} , Validators.required],
      Tiene_Correo: [{value: '', disabled: true}, Validators.required],
      Email: [{value: '', disabled: true}, Validators.required],
      Lugar_Trabajo: [{value: '', disabled: true}, Validators.required],
      Ciudad: [{value: '', disabled: true}, Validators.required],
      Colonia: [{value: '', disabled: true}, Validators.required],
      Estado_Civil: [{value: '', disabled: true}, Validators.required],
      Cliente: [{value: '', disabled: true}, Validators.required],
      Asesor_Contacto: [{value: '', disabled: true}, Validators.required],
      Vendedor_atendera: [{value: '', disabled: true}, Validators.required],
      Medio_gral: [{value: '', disabled: true}, Validators.required],
      Medio_especifico: [{value: '', disabled: true}, Validators.required],
      Valor_Vivienda: [{value: '', disabled: true}, Validators.required],
      Tipo_Ingreso: [{value: '', disabled: true}, Validators.required],
      Ingreso_MXN: [{value: '', disabled: true}, Validators.required],
      Viable: [{value: '', disabled: true}, Validators.required],
      Semana: [{value: '', disabled: true}, Validators.required],
      Fecha_Registro: [{value: '', disabled: true}, Validators.required],
      Comentarios: [{value: '', disabled: true}, Validators.required]
    });
  }

}
