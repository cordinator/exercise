import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { Message, MessageType } from '../../app/shared/message-banner/message'

import { ManageProfileService } from './manageProfile.service';
import { ManageProfile } from './manageProfile';

@IonicPage()
@Component({
  selector: 'page-manageProfile-detail',
  templateUrl: 'manageProfile-detail.component.html',
  providers: [ManageProfileService]
})
export class ManageProfileDetailPage implements OnInit {
  item: ManageProfile;
  editMode: boolean = false;
  formGroup: FormGroup;
  submitted: boolean = false;
  messages: Message[] = [];

  constructor(private service: ManageProfileService,
    private loadingService: LoadingService,
    private nav: NavController,
    private params: NavParams,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.item = this.params.get('item');
    this.editMode = this.item ? true : false;
    this.buildForm();
  }

  create(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading()

    this.service.createProfile(this.formGroup.controls.name.value).subscribe(res => {
      if (res) {
        this.nav.pop();
      } else {
        this.setMessage(MessageType.error, 'There was a problem creating profile.');
      }
    },
      error => {
        this.loadingService.dismiss();
        this.setMessage(MessageType.error, 'There was a problem creating profile.');
      });
  }

  update(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading()

    this.service.updateProfile(this.formGroup.controls.id.value, this.formGroup.controls.name.value).subscribe(res => {
      if (res) {
        this.nav.pop();
      } else {
        this.setMessage(MessageType.error, 'There was a problem updating profile.');
      }
    },
      error => {
        this.loadingService.dismiss();
        this.setMessage(MessageType.error, 'There was a problem updating profile.');
      });
  }

  private buildForm(): void {
    if (this.editMode) {
      this.formGroup = this.formBuilder.group({
        id: [this.item.id],
        name: [this.item.name, Validators.compose([Validators.required])]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        id: [''],
        name: ['', Validators.compose([Validators.required])]
      });
    }
  }

  private start(): void {
    this.submitted = true;
    this.messages = [];
  }

  private setMessage(type: MessageType, message: string): void {
    this.messages.push({ type: type, message: message });
  }
}
