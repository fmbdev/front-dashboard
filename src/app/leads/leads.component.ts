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
  private entries: number[] = [5, 10, 20, 50, 100];
  private entriesForm: FormGroup;
  private filterForm: FormGroup;
  private total: number = 0;
  
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
    this.router.navigate(['leadsform', id]);
  }

  submitFilter(){
    let filter = this.filterForm.controls['filter'].value;
    let valueField = this.filterForm.controls['field'].value;
    this.leads = this.leadServ.getLeadsByFilter(filter, valueField);
  }

  enableFilterField(filter: string){
    if(filter != ""){
      this.filterForm.controls['field'].enable();
    }else{
      this.leads = this.leadServ.getAllLeads()
      this.filterForm.controls['field'].setValue('');
      this.filterForm.controls['field'].disable();
    }
  }

  private initForm(){
    // Form for filter entries
    this.entriesForm = this.formBuilder.group({
      itempage: [10, Validators.required]
    });

    //Form for filter fields
    this.filterForm = this.formBuilder.group({
      filter: ['', Validators.required],
      field: [{value: '', disabled: true}, Validators.required]
    });
  }

}
