import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Profile } from '../../../pages/profile/profile';

@Injectable()
export class MessagingService {
  profileChanged: BehaviorSubject<Profile> = new BehaviorSubject(null);

  constructor() { }
}