import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { LeadsService } from '../providers/leads.service';

@Component({
  selector: 'dash-leads-form',
  templateUrl: './leads-form.component.html',
  styleUrls: ['./leads-form.component.scss']
})
export class LeadsFormComponent implements OnInit {

  private registerId: string= "";
  private data: any;
  private form: FormGroup;
  private tipifications: any;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private leadServ: LeadsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.registerId = params['register_id']
    });

    this.data = this.leadServ.getRegisterLeadById(this.registerId);
    this.initForm();

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

  changeViable(value: string){
    if(value.toUpperCase() == "SI"){
      this.changeDataIsViable();
    }else{
      this.changeDataIsNotViable();
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
  
  private initForm(){
    this.form = this.formBuilder.group({
      Nombre: [this.data.Nombre, Validators.required],
      Apellidos: [this.data.Apellidos, Validators.required],
      Telefono: [this.data.Telefono, Validators.required],
      Celular: [this.data.Celular, Validators.required],
      Email: [this.data.Email, Validators.required],
      FechaNacimiento: [this.data.FechaNacimiento, Validators.required],
      Semana: [this.data.Semana, Validators.required],
      Viable: ['', Validators.required],
      FechaCreacion: [this.data.FechaCreacion, Validators.required],
      DesarrolloInteres: [this.data.DesarrolloInteres, Validators.required],
      Tipificacion: ['', Validators.required],
      OtraTipificacion: [this.data.OtraTipificacion, Validators.required],
      Comentarios: [this.data.Comentarios, Validators.required]
    });
  }

}
