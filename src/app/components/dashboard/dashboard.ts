'use strict'
import { OnInit, Component } from '@angular/core'
import { Router } from '@angular/router-deprecated'
import { Observable } from 'rxjs'

import { Hero } from '../../interfaces'
import { HeroActions } from '../../actions/hero.actions'

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  template: require('./dashboard.html'),
  styles: [ require('./dashboard.scss') ]
})
export class DashboardComponent implements OnInit{
  heroes$: Observable<Hero[]>

  constructor(
    private router: Router,
    private heroActions: HeroActions
  ) {
    console.log('DashboardComponent.constructor()')
    this.heroes$ = this.heroActions.heroes$
  }

  ngOnInit () {
    console.log('DashboardComponent.ngOnInit()')
    this.heroActions.loadAll()
  }

  gotoDetail (hero: Hero) {
    const link = ['HeroDetail', { id: hero.id }]
    this.router.navigate(link)
  }
}