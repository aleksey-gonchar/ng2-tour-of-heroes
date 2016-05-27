'use strict'
import { Injectable } from '@angular/core'
import { Store, Action } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'

import { AppStore, Hero } from '../interfaces'
import { HEROES_ACTION_TYPES } from '../reducers'
import { HeroApi } from '../services/hero-api.service'

@Injectable()
export class HeroActions {
  
}