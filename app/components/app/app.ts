'use strict'
import { OnInit, AfterViewChecked, Component } from '@angular/core'
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'

import { HeroService } from '../../services/hero.service'
import { HeroesComponent } from '../heroes/heroes'
import { DashboardComponent } from '../dashboard/dashboard'
import { HeroDetailComponent } from '../hero-detail/hero-detail'
import { HeroActions } from '../../actions/hero.actions'

@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
])
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.html',
  styleUrls: ['app.css'],
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    HeroActions
  ]
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes'

  constructor (
    private heroActions: HeroActions,
    private heroService: HeroService
  ) {
    console.log('App.constructor()')
  }

  ngOnInit () {
    console.log('App.ngOnInit()')
    this.heroActions.loadAll()
  }
}