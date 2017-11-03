import { BrowserModule } from '@angular/platform-browser'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { AuthenticationService } from './auth/auth.service';
import { AuthHttpService } from './auth/auth-http.service';
import { LoadingService } from './loading/loading.service';
import { ToggleMenuService } from './menu/toggle-menu.service';
import { MessagingService } from './shared/messaging/messaging.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    AuthenticationService,
    LoadingService,
    ToggleMenuService,
    MessagingService,
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    Camera,
    FilePath,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: AuthHttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new AuthHttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule { }
