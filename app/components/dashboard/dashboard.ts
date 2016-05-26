'use strict'
import { OnInit, Component } from '@angular/core'
import { Router } from '@angular/router-deprecated'
import { Observer, Observable } from 'rxjs'

import { Hero } from '../../models/hero'
import { HeroService } from '../../services/hero.service'

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['dashboard.css']
})
export class DashboardComponent implements OnInit{
  heroes$: Observable<Hero[]>

  constructor(
    private router: Router,
    private heroService: HeroService
  ) {
    console.log('DashboardComponent.constructor()')
    // this.heroes$ = this.heroService.heroes$.take(5)
  }

  ngOnInit () {
    console.log('DashboardComponent.ngOnInit()')
  //   this.heroService.getHeroes()
  //     .then(heroes => this.heroes = heroes.slice(1,5))
  }

  gotoDetail (hero: Hero) {
    const link = ['HeroDetail', { id: hero.id }]
    this.router.navigate(link)
  }
}