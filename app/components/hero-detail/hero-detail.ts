'use strict'
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { RouteParams } from '@angular/router-deprecated'

import { Hero } from '../../interfaces'
import { HeroService } from '../../services/hero.service'

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.html',
  styleUrls: ['hero-detail.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero
  @Output() close = new EventEmitter()

  navigated = false
  error: any = null

  constructor (
    private heroService: HeroService,
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
    this.heroService
      .save(this.hero)
      .then(hero => {
        this.hero = hero
        this.goBack(hero)
      })
      .catch(err => this.error= err)
  }

  goBack (savedHero: Hero = null) {
    this.close.emit(savedHero)
    if (this.navigated) { window.history.back() }
  }
}