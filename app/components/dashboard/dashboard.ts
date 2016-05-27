'use strict'
import { OnInit, Component } from '@angular/core'
import { Router } from '@angular/router-deprecated'
import { Observer, Observable, Subject } from 'rxjs'

import { Hero } from '../../models/hero'
import { HeroService } from '../../services/hero.service'
import { HeroActions } from '../../actions/hero.actions'

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.css']
})
export class DashboardComponent implements OnInit{
  heroes$: Observable<Hero[]> = new Subject()

  constructor(
    private router: Router,
    private heroService: HeroService,
    private heroActions: HeroActions
  ) {
    console.log('DashboardComponent.constructor()')
    this.heroService.heroes$.take(3).subscribe(payload => {
      // this.heroes$.next(payload.slice(1,5))
      console.dir(payload)
      this.heroes$.next(payload)
    })
    heroActions.loadAll()
  }

  ngOnInit () {
    console.log('DashboardComponent.ngOnInit()')
    // this.heroService.getHeroes()
  //     .then(heroes => this.heroes = heroes.slice(1,5))
  }

  gotoDetail (hero: Hero) {
    const link = ['HeroDetail', { id: hero.id }]
    this.router.navigate(link)
  }
}