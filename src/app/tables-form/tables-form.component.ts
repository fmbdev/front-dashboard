import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { TablesService } from '../providers/tables.service';

@Component({
  selector: 'dash-tables-form',
  templateUrl: './tables-form.component.html',
  styleUrls: ['./tables-form.component.scss']
})
export class TablesFormComponent implements OnInit {

  private table: string = "";
  private registerId: string= "";
  private data: any;
  private form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private tableServ: TablesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.table = params['table'];
      this.registerId = params['register_id']
    });

    this.data = this.tableServ.getRegisterTableById(this.registerId);
    this.initForm();

    if(this.data.Tiene_Correo != ""){
      if(this.data.Tiene_Correo.toUpperCase() == "SI"){
        this.form.controls['Tiene_Correo'].setValue('SI');
      }else{
        this.form.controls['Tiene_Correo'].setValue('NO');
      }
    }

    if(this.data.Cliente != ""){
      if(this.data.Cliente.toUpperCase() == "CITA"){
        this.form.controls['Cliente'].setValue('CITA');
      }else{
        this.form.controls['Cliente'].setValue('PASE');
      }
    }

  }

  onSubmit(){
    console.log(this.form.value);
  }

  private initForm(){
    this.form = this.formBuilder.group({
      Nombre: [this.data.Nombre, Validators.required],
      Fecha_Nacimiento: [this.data.Fecha_Nacimiento, Validators.required],
      Telefono_Casa: [this.data.Telefono_Casa, Validators.required],
      Telefono_Celular: [this.data.Telefono_Celular, Validators.required],
      Tiene_Correo: ['', Validators.required],
      Correo_Electronico: [this.data.Email, Validators.required],
      Lugar_Trabajo: [this.data.Lugar_Trabajo, Validators.required],
      Ciudad: [this.data.Ciudad, Validators.required],
      Colonia: [this.data.Colonia, Validators.required],
      Estado_Civil: [this.data.Estado_Civil, Validators.required],
      Cliente: ['', Validators.required],
      Asesor_Contacto: [this.data.Asesor_Contacto, Validators.required],
      Vendedor_atendera: [this.data.Vendedor_atendera, Validators.required],
      Medio_gral: [this.data.Medio_gral, Validators.required],
      Medio_especifico: ['', Validators.required],
      Valor_Vivienda: [this.data.Valor_Vivienda, Validators.required],
      Tipo_Ingreso: [this.data.Tipo_Ingreso, Validators.required],
      Ingreso_MXN: [this.data.Ingreso_MXN, Validators.required],
      Viable: [this.data.Viable, Validators.required],
      Semana: [this.data.Semana, Validators.required],
      Fecha_Registro: [this.data.Fecha_Registro, Validators.required],
      Comentarios: [this.data.Comentarios, Validators.required]
    });
  }

}
