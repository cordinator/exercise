import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { ToggleMenuService } from '../../app/menu/toggle-menu.service';
import { Message, MessageType } from '../../app/shared/message-banner/message'

import { ForgotPasswordService } from './forgotPassword.service';
import { ForgotPassword } from './forgotPassword';

@IonicPage()
@Component({
  selector: 'page-forgotPassword',
  templateUrl: 'forgotPassword.component.html',
  providers: [ForgotPasswordService]
})
export class ForgotPasswordPage implements OnInit {
  formGroup: FormGroup;
  submitted: boolean = false;
  messages: Message[] = [];

  constructor(private service: ForgotPasswordService,
    private loadingService: LoadingService,
    private toggleMenuService: ToggleMenuService,
    private nav: NavController,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.toggleMenuService.toggleMenu(false);
    this.buildForm();
  }

  submit(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading();

    this.service.forgotPassword(this.formGroup.value).subscribe(res => {
      this.loadingService.dismiss();

      if (res) {
        this.setMessage(MessageType.success, 'An email has been sent to the request email address.');
      } else {
        this.setMessage(MessageType.error, 'There was a problem sending reset password email.');
      }
    },
      error => {
        this.loadingService.dismiss();
        this.setMessage(MessageType.error, 'There was a problem sending reset password email.');
      });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
  }

  private start(): void {
    this.submitted = true;
    this.messages = [];
  }

  private setMessage(type: MessageType, message: string): void {
    this.messages.push({ type: type, message: message });
  }
}