import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { ToggleMenuService } from '../../app/menu/toggle-menu.service';
import { Message, MessageType } from '../../app/shared/message-banner/message';

import { AuthenticationService } from '../../app/auth/auth.service';
import { RegisterService } from './register.service';
import { Register } from './register';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.component.html',
  providers: [RegisterService]
})
export class RegisterPage implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  messages: Message[] = [];

  constructor(private service: RegisterService,
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private toggleMenuService: ToggleMenuService,
    private nav: NavController,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.toggleMenuService.toggleMenu(false);
    this.buildForm();
  }

  register(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading()

    this.service.register(this.formGroup.value).subscribe(success => {
      if (success) {
        this.logUserIn();
      } else {
        this.setMessage(MessageType.error, "Problem creating account.");
      }

      this.loadingService.dismiss();
    },
      error => {
        let obj = JSON.parse(error.text());
        if (obj.modelState[""]) {
          this.setMessage(MessageType.error, obj.modelState[""][0]);
        }

        if (obj.modelState["model.Password"]) {
          this.setMessage(MessageType.error, obj.modelState["model.Password"][0]);
        }

        if (obj.modelState["model.ConfirmPassword"]) {
          this.setMessage(MessageType.error, obj.modelState["model.ConfirmPassword"][0]);
        }

        this.loadingService.dismiss();
      });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      pin: ['', Validators.compose([Validators.required])]
    });
  }

  private start(): void {
    this.submitted = true;
    this.messages = [];
  }

  private setMessage(type: MessageType, message: string): void {
    this.messages.push({ type: type, message: message });
  }

  private logUserIn() {
    let login = {
      email: this.formGroup.controls.email.value,
      password: this.formGroup.controls.password.value
    };
    
    this.authService.login(login).subscribe(res => {
      if (res) {
        this.nav.setRoot('ProfilesPage');
      }
      else {
        this.setMessage(MessageType.error, "Account created but there was an issue logging in.");
      }
    })
  }
}