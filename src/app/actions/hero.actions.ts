'use strict'
import { Injectable } from '@angular/core'
import { Store, Action } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'

import { AppStore, Hero } from '../interfaces'
import { HEROES_ACTION_TYPES } from '../reducers'
import { HeroApi } from '../services/hero-api'

@Injectable()
export class HeroActions {
  heroes$: Observable<Hero[]>

  private actions$: BehaviorSubject<Action> = new BehaviorSubject({
    type: undefined,
    payload: undefined
  })

  constructor(
    private store: Store<AppStore>,
    private heroApi: HeroApi
  ) {
    this.heroes$ = this.store.select(state => state.heroes)
    this.actions$.subscribe(action => this.store.dispatch(action))
  }
  
  create (hero: Hero) {
    return this.heroApi.create(hero)
      .subscribe(newHero => this.actions$.next({
        type: HEROES_ACTION_TYPES.CREATE,
        payload: newHero
      }))
  }

  delete (hero: Hero) {
    return this.heroApi.delete(hero)
      .subscribe(() => this.actions$.next({
        type: HEROES_ACTION_TYPES.DELETE,
        payload: hero
      }))
  }
  
  save (hero: Hero) {
    if (hero.id) {
      return this.heroApi.update(hero)
        .subscribe(() => this.actions$.next({
          type: HEROES_ACTION_TYPES.UPDATE,
          payload: hero
        }))
    }

    return this.heroApi.create(hero)
      .subscribe(() => this.actions$.next({
        type: HEROES_ACTION_TYPES.CREATE,
        payload: hero
      }))
  }

  getAll () {
    return this.heroApi.getAll()
      .subscribe(heroes => this.actions$.next({
        type: HEROES_ACTION_TYPES.GET_ALL,
        payload: heroes
      }))
  }
}
