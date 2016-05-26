'use strict'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class HeroActions {
  loadAll$: Subject<any> = new Subject()

  constructor () {
    console.log('HeroActions.constructor()')
  }

  loadAll () {
    console.log('HeroActions.loadAll()')
    this.loadAll$.next(true)
  }
}