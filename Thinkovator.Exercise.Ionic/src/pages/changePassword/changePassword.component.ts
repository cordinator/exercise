import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { Message, MessageType } from '../../app/shared/message-banner/message';

import { ChangePasswordService } from './changePassword.service';
import { ChangePassword } from './changePassword';

@IonicPage()
@Component({
  selector: 'page-changePassword',
  templateUrl: 'changePassword.component.html',
  providers: [ChangePasswordService]
})
export class ChangePasswordPage {
  formGroup: FormGroup;
  submitted: boolean = false;
  messages: Message[] = [];

  constructor(private service: ChangePasswordService,
    private loadingService: LoadingService,
    private nav: NavController,
    private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])],
    });
  }

  changePassword() {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading();
    this.service.changePassword(this.formGroup.value).subscribe(success => {
      if (success) {
        this.formGroup.reset();
        this.setMessage(MessageType.success, "Success! Password has been reset.");
      } else {
        this.setMessage(MessageType.error, "Problem resetting your password.");
      }

      this.loadingService.dismiss();
    },
      error => {
        let obj = JSON.parse(error.text());
        if (obj.modelState[""]) {
          this.setMessage(MessageType.error, obj.modelState[""][0]);
        }

        if (obj.modelState["model.NewPassword"]) {
          this.setMessage(MessageType.error, obj.modelState["model.NewPassword"][0]);
        }

        if (obj.modelState["model.ConfirmNewPassword"]) {
          this.setMessage(MessageType.error, obj.modelState["model.ConfirmNewPassword"][0]);
        }

        this.loadingService.dismiss();
      });
  }

  private start(): void {
    this.submitted = true;
    this.messages = [];
  }

  private setMessage(messageType: MessageType, message: string): void {
    this.messages.push({ type: messageType, message: message });
  }
}