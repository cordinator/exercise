import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ToggleMenuService } from '../../app/menu/toggle-menu.service';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.component.html'
})
export class WelcomePage implements OnInit {
  constructor(private toggleMenuService: ToggleMenuService,
    private nav: NavController) { }

  ngOnInit(): void {
    this.toggleMenuService.toggleMenu(false);
  }

  register(): void {
    this.nav.push('RegisterPage');
  }

  login(): void {
    this.nav.push('LoginPage');
  }
}