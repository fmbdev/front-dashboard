import { Component, OnInit , Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../providers/auth.service';

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
              private renderer: Renderer2) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const newUser: User = this.loginForm.value;

    this.authServ.userLogin(newUser)
        .subscribe(
          (res: any) => {
            this.loginForm.reset();

            if (res.status === 200) {
              this.showMessageAuth(res.data.message, 'msg-success', 'fa-check-circle');
              setTimeout(() => {
                this.router.navigate(['']);
              }, 2500);
            }
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


}
