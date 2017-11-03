import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { Message, MessageType } from '../../app/shared/message-banner/message'

import { SettingsService } from './settings.service';
import { Settings } from './settings';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.component.html',
  providers: [SettingsService]
})
export class SettingsPage implements OnInit {
  isAdmin: boolean = false;
  formGroup: FormGroup;
  submitted: boolean = false;
  messages: Message[] = [];

  constructor(private service: SettingsService,
    private loadingService: LoadingService,
    private nav: NavController,
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        id: [''],
        name: ['', Validators.compose([Validators.required])],
        age: [''],
        weight: [''],
        units: ['']
      });
  }

  ngOnInit(): void {
    this.setIsAdmin();
    this.getInputs();
  }

  uploadProfilePicture(): void {
    this.nav.push('ImagePage');
  }

  updateSettings(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading()
    this.service.updateSettings(this.formGroup.value).subscribe(success => {
      if (success) {
        this.setMessage(MessageType.success, "Success! Settings has been saved.");
      } else {
        this.setMessage(MessageType.error, "Problem saving settings.");
      }
    },
      error => {
        this.setMessage(MessageType.error, error);
      });
  }

  private setIsAdmin(): void {
    let isAdmin = localStorage.getItem('isAdmin');
    this.isAdmin = isAdmin && isAdmin.toLowerCase() == 'true';
  }

  private getInputs(): void {
    let profileId = +localStorage.getItem('profileId');
    this.service.getSettings(profileId).subscribe(res => {
      this.formGroup = this.formBuilder.group({
        id: [profileId],
        name: [res.name, Validators.compose([Validators.required])],
        age: [res.age],
        weight: [res.weight],
        units: [res.units]
      });
    });
  }

  private start(): void {
    this.messages = [];
    this.submitted = true;
  }

  private setMessage(type: MessageType, message: string): void {
    this.loadingService.dismiss();

    this.messages.push({ type: type, message: message });
  }
}