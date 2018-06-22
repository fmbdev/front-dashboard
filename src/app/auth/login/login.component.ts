import { Component, OnInit , Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../providers/auth.service';
import { RoleAccessService } from '../../providers/role-access.service';

import { User } from '../../interfaces/user';
import 'rxjs';

@Component({
  selector: 'dash-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;

  private message: String = '';

  @ViewChild('msgcont') msgcont: ElementRef;
  @ViewChild('msgicon') msgicon: ElementRef;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authServ: AuthService,
              private renderer: Renderer2,
              private roleAccessServ: RoleAccessService) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const newUser: User = this.loginForm.value;

    this.authServ.userLogin(newUser)
        .subscribe(
          (res: any) => {
            this.loginForm.reset();
            this.roleAccessServ.accessByRole();
          },
          (err: any) => {
            this.showMessageAuth(err.data.message, 'msg-error', 'fa-times-circle');
          }
        );
  }

  private initForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private showMessageAuth(message: string, msg_class: string, icon_class: string) {
    this.message = message;
    this.renderer.removeClass(this.msgcont.nativeElement, 'hidden');

    this.renderer.removeClass(this.msgcont.nativeElement, msg_class);   
    this.renderer.addClass(this.msgcont.nativeElement, msg_class);

    this.renderer.removeClass(this.msgicon.nativeElement, icon_class);
    this.renderer.addClass(this.msgicon.nativeElement, icon_class);
  }

}
