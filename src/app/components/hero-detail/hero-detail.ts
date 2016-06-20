'use strict'
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { RouteParams } from '@angular/router-deprecated'

import { Hero } from '../../interfaces'

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  template: require('./hero-detail.html'),
  styles: [ require('./hero-detail.scss') ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero
  @Output() close = new EventEmitter()

  navigated = false
  error: any = undefined

  constructor (
    private routeParams: RouteParams
  ) {
    console.log('HeroDetailComponent.constructor()')
  }

  ngOnInit () {
    console.log('HeroDetailComponent.ngOnInit()')
    // if (this.routeParams.get('id') !== null) {
    //   this.navigated = true
    //   const id = +this.routeParams.get('id')
    //   this.heroService.getHero(id)
    //     .then(hero => this.hero = hero)
    // } else {
    //   this.navigated = false
    //   this.hero = new Hero()
    // }
  }

  save () {
    // this.heroService
    //   .save(this.hero)
    //   .then(hero => {
    //     this.hero = hero
    //     this.goBack(hero)
    //   })
    //   .catch(err => this.error= err)
  }

  goBack (savedHero: Hero = undefined) {
    this.close.emit(savedHero)
    if (this.navigated) { window.history.back() }
  }
}
