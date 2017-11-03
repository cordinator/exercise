import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { AppSettings } from '../../app/app.settings';
import { LoadingService } from '../../app/loading/loading.service';
import { SessionService } from './session.service';
import { Session } from './session';

@IonicPage()
@Component({
  selector: 'page-session',
  templateUrl: 'session.component.html',
  providers: [SessionService]
})
export class SessionPage implements OnInit {
  @ViewChild('videoPlayer') el: ElementRef;
  play: string = 'play';
  pause: string = 'pause';
  videoPlayer: any;
  playPause: string = this.pause;
  source: string;
  videos: Array<string>;
  videoLocation: number = 0;
  seconds: number = 30;
  timerSubscription: Subscription;
  sessionSubscription: Subscription;
  sessionMinutes: number;
  sessionSeconds: number = 59;

  constructor(private service: SessionService,
    private loadingService: LoadingService,
    private navCtrl: NavController,
    private params: NavParams,
    private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.getVideos();
    this.startTimer();

    this.sessionMinutes = +this.params.get('minutes') - 1;
    this.startSession();
  }

  ionViewWillLeave(): void {
    this.timerSubscription.unsubscribe();
    this.sessionSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.videoPlayer = this.el.nativeElement;
    this.videoPlayer.controls = false;
    this.videoPlayer.autoplay = true;
    this.videoPlayer.loop = true;
    this.videoPlayer.defaultMuted = true;
  }

  togglePlayPause(): void {
    if (this.videoPlayer.paused || this.videoPlayer.ended) {
      this.startAll();
    }
    else {
      this.end();
    }
  }

  next(): void {
    if (this.videoLocation < this.videos.length - 1) {
      this.videoLocation += 1;
    } else {
      this.videoLocation = 0;
    }
    this.source = this.videos[this.videoLocation];
    this.resetTimer();
  }

  previous(): void {
    if (this.videoLocation > 0) {
      this.videoLocation -= 1;
    } else {
      this.videoLocation = this.videos.length - 1;
    }
    this.source = this.videos[this.videoLocation];
    this.resetTimer();
  }

  end(): void {
    this.stopAll();
    let prompt = this.alertCtrl.create({
      title: 'End Workout?',
      subTitle: `Would you like to end your workout?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.startAll();
          }
        },
        {
          text: 'End',
          handler: data => {
            this.finished();
          }
        }
      ]
    });
    prompt.present();
  }

  private getVideos(): void {
    let workoutId = this.params.get('workoutId');
    this.service.getVideos(workoutId).subscribe(res => {
      this.videos = [];

      res.forEach(video => {
        this.videos.push(`${AppSettings.API_ENDPOINT}/media/${video}.mp4`)
      });

      this.source = this.videos[0];
    },
      error => {

      });
  }

  private startSession(): void {
    let timer = TimerObservable.create(0, 1000);
    this.sessionSubscription = timer.subscribe(t => {
      if (this.sessionMinutes === 0 && this.sessionSeconds == 0) {
        this.finished();
      } else if (this.sessionSeconds === 0) {
        this.sessionMinutes = this.sessionMinutes - 1;
        this.sessionSeconds = 59;
      } else {
        this.sessionSeconds = this.sessionSeconds - 1;
      }
    });
  }

  private startTimer(): void {
    let timer = TimerObservable.create(0, 1000);
    this.timerSubscription = timer.subscribe(t => {
      if (this.seconds === 0) {
        this.seconds = 30;
        this.next();
      }
      this.seconds = this.seconds - 1;
    });
  }

  private stopTimer(): void {
    this.timerSubscription.unsubscribe();
  }

  private stopSession(): void {
    this.sessionSubscription.unsubscribe();
  }

  private resetTimer(): void {
    this.stopTimer();
    this.seconds = 30;
    this.startTimer();
  }

  private startAll(): void {
    this.startTimer();
    this.startSession();
    this.playPause = this.pause;
    this.videoPlayer.play();
  }

  private stopAll(): void {
    this.stopTimer();
    this.stopSession();
    this.playPause = this.play;
    this.videoPlayer.pause();
  }

  private finished(): void {
    this.loadingService.showLoading();

    let profileId = +localStorage.getItem('profileId');
    let workoutId = this.params.get('workoutId');
    let minutes = +this.params.get('minutes');
    let points = +localStorage.getItem('points');
    let minutesExercised = minutes - this.sessionMinutes;

    points = points + minutesExercised;
    localStorage.setItem('points', points.toString());

    let length = (minutesExercised - 1) * 60;
    if (60 - this.sessionSeconds >= 15) {
      length = length + 60;
    }

    let session = {
      profileId: profileId,
      workoutId: workoutId,
      length: length
    }

    this.service.createSession(session).subscribe(success => {
      this.loadingService.dismiss();
      this.navCtrl.setRoot('WorkoutFinishedPage')
    },
      error => {
        this.loadingService.dismiss();
      });
  }
}
