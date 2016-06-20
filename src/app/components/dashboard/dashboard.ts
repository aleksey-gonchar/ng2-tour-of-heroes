'use strict'
import { OnInit, Component } from '@angular/core'
// import { Router } from '@angular/router-deprecated'
import { RouteSegment, OnActivate, CanDeactivate } from '@angular/router'
import { Observable } from 'rxjs'

import { Hero } from '../../interfaces'
import { HeroActions } from '../../actions/hero.actions'

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  template: require('./dashboard.html'),
  styles: [ require('./dashboard.scss') ]
})
export class DashboardComponent implements OnInit, OnActivate, CanDeactivate {
  heroes$: Observable<Hero[]>

  constructor(
    // private router: Router,
    private heroActions: HeroActions
  ) {
    console.log('DashboardComponent.constructor()')
    this.heroes$ = this.heroActions.heroes$
  }

  routerOnActivate(currentSegment: RouteSegment) {
    this.heroes$ = this.heroActions.heroes$
  }

  routerCanDeactivate(): any {
    return Promise.resolve(true);
  }

  ngOnInit () {
    console.log('DashboardComponent.ngOnInit()')
    this.heroActions.getAll()
  }

  gotoDetail (hero: Hero) {
    const link = ['HeroDetail', { id: hero.id }]
    console.error('NOT IMPLEMENTED')
    // this.router.navigate(link)
  }
}
