import { Injectable } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Injectable()
export class ToggleMenuService {

  constructor(private menuCtrl: MenuController) { }

  toggleMenu(value: boolean): void {
    this.menuCtrl.enable(value, 'appMenu');
  }
}