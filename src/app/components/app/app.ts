'use strict'
import { Component } from '@angular/core'
// import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated'
import { Routes, ROUTER_DIRECTIVES } from '@angular/router'

import { HeroesComponent } from '../heroes/heroes'
import { DashboardComponent } from '../dashboard/dashboard'
import { HeroDetailComponent } from '../hero-detail/hero-detail'
import { HeroActions } from '../../actions/hero.actions'

@Routes([
  {
    path: '/dashboard',
    component: DashboardComponent
  },
  {
    path: '/heroes',
    component: HeroesComponent
  },
  {
    path: '/detail/:id',
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
    HeroActions
  ]
})
export class AppComponent {
  title = 'Tour of Heroes'
}
