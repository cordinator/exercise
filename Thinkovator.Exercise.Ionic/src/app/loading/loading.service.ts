import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingService {
  loading: Loading;

  constructor(private loadingCtrl: LoadingController) { }

  showLoading(content?: string): void {
    this.loading = this.loadingCtrl.create({
      content: content != null ? content : 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  dismiss(): void {
    this.loading.dismiss();
  }

  dismissAll(): void {
    this.loading.dismissAll();
  }
}