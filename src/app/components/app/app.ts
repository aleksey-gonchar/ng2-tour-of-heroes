'use strict'
import { Component } from '@angular/core'
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'

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
  template: require('./app.html'),
  styles: [ require('./app.scss') ],
  directives: [
    ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS,
    HeroActions
  ]
})
export class AppComponent {
  title = 'Tour of Heroes'
}
