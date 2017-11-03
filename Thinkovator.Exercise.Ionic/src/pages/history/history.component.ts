import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { isSameDay, isSameMonth } from 'date-fns';

// https://mattlewis92.github.io/angular-calendar/#/kitchen-sink
import {
  CalendarEvent,
  CalendarMonthViewDay,
  CalendarEventAction
} from 'angular-calendar';

import { LoadingService } from '../../app/loading/loading.service';
import { HistoryService } from './history.service';
import { History } from './history';

@IonicPage()
@Component({
  selector: 'page-history',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'history.component.html',
  providers: [HistoryService]
})
export class HistoryPage implements OnInit {
  profileId: number;
  view: string = 'month';
  viewDate: Date = new Date()
  selectedDay: CalendarMonthViewDay;
  events: CalendarEvent<{ item: History }>[] = [];
  activeDayIsOpen: boolean = false;
  refresh: Subject<any> = new Subject();
  days_label: string[] = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'
  ];
  actions: CalendarEventAction[] = [
    {
      label: '<span>DELETE</span>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      }
    },
    {
      label: '<span>EDIT</span>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.editEvent(event);
      }
    }
  ];

  constructor(private service: HistoryService,
    private loadingService: LoadingService,
    private nav: NavController,
    private alertCtrl: AlertController) { }

  ngOnInit(): void {
    this.profileId = +localStorage.getItem('profileId')
  }

  ionViewDidEnter(): void {
    this.getEvents();
  }

  dayClicked(day: CalendarMonthViewDay): void {
    if (this.selectedDay) {
      delete this.selectedDay.cssClass;
    }
    day.cssClass = 'cal-day-selected';
    this.selectedDay = day;

    if (isSameMonth(day.date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, day.date) && this.activeDayIsOpen === true) ||
        day.events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = day.date;
      }
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (
        this.selectedDay &&
        day.date.getTime() === this.selectedDay.date.getTime()
      ) {
        day.cssClass = 'cal-day-selected';
        this.selectedDay = day;
      }
    });
  }

  addEvent(): void {
    this.nav.push('HistoryDetailPage', {
      selectedDate: this.selectedDay ? this.selectedDay.date : null
    });
  }

  private editEvent(event: CalendarEvent): void {
    this.nav.push('HistoryDetailPage', {
      item: event.meta.item
    });
  }

  private deleteEvent(event: CalendarEvent): void {
    this.alertCtrl.create({
      title: 'Delete Workout',
      subTitle: `Are you sure you wish to delete ${event.title}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: data => {
            this.loadingService.showLoading()
            this.service.deleteWorkoutHistory(this.profileId, event.meta.item.id).subscribe(res => {
              this.events = this.events.filter(f => f.meta.item.id !== event.meta.item.id);
              this.refresh.next();

              this.loadingService.dismiss();
            },
              error => {
                this.loadingService.dismiss();
              });
          }
        }
      ]
    }).present();
  }

  private getEvents(): void {
    this.service.getWorkoutHistory(this.profileId).subscribe(res => {
      if (res) {
        let results: CalendarEvent<{ item: History }>[] = [];
        res.forEach(item => {
          let event = {
            meta: {
              item: item
            },
            start: new Date(item.workoutDate),
            title: item.workout.name,
            color: this.getEventColor(item),
            actions: this.actions
          };

          results.push(event);
        });
        this.events = results;
        this.refresh.next();
      }
    },
      error => {
        console.log('error in get history');
      });
  }

  private getEventColor(history: History): any {
    let colors: any = {
      red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      },
      blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      },
      yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
      }
    };

    return colors.blue;
  }
}