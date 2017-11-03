import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';

import { AuthenticationService } from './auth/auth.service';
import { MessagingService } from './shared/messaging/messaging.service'
import { Profile } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'WelcomePage';
  profile: Profile;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authService: AuthenticationService,
    private messagingService: MessagingService,
    private alertCtrl: AlertController) {
    this.initializeApp();
    this.subscribeToEvents();
  }

  openPage(page): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(): void {
    let prompt = this.alertCtrl.create({
      title: 'Log Out',
      subTitle: `Do you really want to log out?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: data => {
            this.authService.logout().subscribe(res => {
              if (res) {
                this.nav.setRoot("WelcomePage");
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }

  private initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private subscribeToEvents(): void {
    this.messagingService.profileChanged.subscribe((profile: Profile) => {
      this.profile = profile;
      this.setPages();
    });
  }

  private setPages(): void {
    if (this.profile && this.profile.isAdmin) {
      this.pages = [
        { title: 'Home', component: 'ProfileDetailPage' },
        { title: 'Profiles', component: 'ProfilesPage' },
        { title: 'Manage Profiles', component: 'ManageProfilesPage' },
        { title: 'Manage Rewards', component: 'ManageRewardsPage' },
        { title: 'Change Password', component: 'ChangePasswordPage' },
        { title: 'Settings', component: 'SettingsPage' }
      ];
    } else {
      this.pages = [
        { title: 'Home', component: 'ProfileDetailPage' },
        { title: 'Profiles', component: 'ProfilesPage' },
        { title: 'Settings', component: 'SettingsPage' }
      ];
    }
  }
}
