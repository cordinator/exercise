import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { AuthenticationService } from '../../app/auth/auth.service';
import { ToggleMenuService } from '../../app/menu/toggle-menu.service';
import { Message, MessageType } from '../../app/shared/message-banner/message';

import { Login } from './login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginPage {
  formGroup: FormGroup;
  submitted: boolean = false;
  messages: Message[] = [];

  constructor(private auth: AuthenticationService,
    private loadingService: LoadingService,
    private toggleMenuService: ToggleMenuService,
    private nav: NavController,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.toggleMenuService.toggleMenu(false);
    this.buildForm();
  }

  login(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading();
    
    this.auth.login(this.formGroup.value).subscribe(allowed => {
      if (allowed) {
        this.nav.setRoot('ProfilesPage');
      } else {
        this.setMessage('Access Denied');
      }
    },
      error => {
        this.setMessage('The Email or Password is invalid.');
      });
  }

  forgotPassword(): void {
    this.nav.push('ForgotPasswordPage');
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  private start(): void {
    this.submitted = true;
    this.messages = [];
  }

  private setMessage(message: string): void {
    this.loadingService.dismiss();
    this.messages.push({ type: MessageType.error, message: message });
  }
}