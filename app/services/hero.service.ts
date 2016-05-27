'use strict'
import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/share'
import { Observable, Observer } from 'rxjs'

import { Hero } from '../models/hero'
import { HeroActions } from '../actions/hero.actions'

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes'

  heroes$: Observable<Hero[]>
  private observer$: Observer<Hero[]>
  private store: {
    heroes: Hero[]
  } = null

  constructor (
    private http: Http,
    private heroActions: HeroActions
  ) {
    console.log('HeroService.constructor()')
    this.heroes$ = new Observable (observer => {
      this.observer$ = observer
    }).share()

    this.heroActions.loadAll$.subscribe(() => {
      this.getHeroes()
    })
  }

  getHero (id: number) {
    return this.http.get(this.heroesUrl)
      .map(response => {
        return response.json().data
      })
      .filter(hero => hero.id === id)
      .take(1)
  }

  getHeroes () {
    let self = this
    this.http.get(this.heroesUrl)
      .map(response => {
        return response.json().data
      })
      .subscribe(payload => {
        self.store = Object.assign({}, {
          heroes: payload
        })
        payload.forEach(item => {
          self.observer$.next(item)
        })
      })
  }

  handleError (err: any) {
    console.error('Ann error occurred', err)
    return Promise.reject(err.message || err)
  }

  private post (hero: Hero): Promise<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' })

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), { headers })
      .toPromise()
      .then(res => {
        return res.json().data
      })
      .catch(this.handleError)
  }

  private put (hero: Hero): Promise<Hero> {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    const url = `${this.heroesUrl}/${hero.id}`

    return this.http
      .put(url, JSON.stringify(hero), { headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }
  
  save (hero: Hero): Promise<Hero> {
    if (hero.id) { return this.put(hero) }

    return this.post(hero)
  }

  delete (hero: Hero) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    const url = `${this.heroesUrl}/${hero.id}`

    return this.http
      .delete(url, { headers })
      .toPromise()
      .catch(this.handleError)
  }
}
