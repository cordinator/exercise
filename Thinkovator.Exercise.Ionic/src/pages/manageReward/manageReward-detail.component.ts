import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoadingService } from '../../app/loading/loading.service';
import { Message, MessageType } from '../../app/shared/message-banner/message'

import { ManageRewardService } from './manageReward.service';
import { ManageReward } from './manageReward';

@IonicPage()
@Component({
  selector: 'page-manageReward-detail',
  templateUrl: 'manageReward-detail.component.html',
  providers: [ManageRewardService]
})
export class ManageRewardDetailPage implements OnInit {
  item: ManageReward;
  editMode: boolean = false;
  formGroup: FormGroup;
  submitted: boolean = false;
  messages: Message[] = [];

  constructor(private service: ManageRewardService,
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

    this.service.createReward(this.formGroup.value).subscribe(res => {
      if (res) {
        this.nav.pop();
      } else {
        this.setMessage(MessageType.error, 'There was a problem creating reward.');
      }
    },
      error => {
        this.loadingService.dismiss();
        this.setMessage(MessageType.error, 'There was a problem creating reward.');
      });
  }

  update(): void {
    this.start();
    if (this.formGroup.status != 'VALID') {
      return;
    }

    this.loadingService.showLoading()

    this.service.updateReward(this.formGroup.value).subscribe(res => {
      if (res) {
        this.nav.pop();
      } else {
        this.setMessage(MessageType.error, 'There was a problem update reward.');
      }
    },
      error => {
        this.loadingService.dismiss();
        this.setMessage(MessageType.error, 'There was a problem update reward.');
      });
  }

  private buildForm(): void {
    if (this.editMode) {
      this.formGroup = this.formBuilder.group({
        id: [this.item.id, Validators.compose([Validators.required])],
        name: [this.item.name, Validators.compose([Validators.required])],
        description: [this.item.description],
        points: [this.item.points, Validators.compose([Validators.required])]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        id: [''],
        name: ['', Validators.compose([Validators.required])],
        description: [''],
        points: ['', Validators.compose([Validators.required])]
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
