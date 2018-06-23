import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { LeadsService } from '../providers/leads.service';

@Component({
  selector: 'dash-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

  private leads: any[];
  private p: number = 1;
  private entries: number[] = [1,2,3,4,5,6,7,8,9,10];
  private entriesForm: FormGroup;
  private filterForm: FormGroup;
  private total: number = 0;
  private tableFields: string[] = ['Nombre', 'Apellidos', 'Número Teléfono', 'Número Celular', 'Email', 'Fecha de Registro', 'Semana', 'Viable', 'Tipificación'];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private leadServ: LeadsService) { }

  ngOnInit() {
    this.initForm();

    this.leads = [];

    this.leadServ.getLeads().subscribe(
      (data: any) => {
        this.leads = data;
        this.total = this.leads.length;
      }
    );
  }

  sendLeadToForm(id){
    let params: NavigationExtras = {
      queryParams: {
        'register_id': id
      }
    }
    this.router.navigate(['leadsform'], params);
  }

  submitFilter(){
    console.log(this.filterForm.value);
  }

  private initForm(){
    // Form for filter entries
    this.entriesForm = this.formBuilder.group({
      itempage: [10, Validators.required]
    });

    //Form for filter fields
    this.filterForm = this.formBuilder.group({
      filter: ['', Validators.required],
      field: ['', Validators.required]
    });
  }

}
