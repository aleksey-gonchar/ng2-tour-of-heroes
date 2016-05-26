'use strict'
import { OnInit, Component } from '@angular/core'
import { Router } from '@angular/router-deprecated'

import { Hero } from '../../models/hero'
import { HeroDetailComponent } from '../hero-detail/hero-detail'
import { HeroService } from '../../services/hero.service'

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.html',
  styleUrls: ['heroes.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[]
  selectedHero: Hero
  addingHero = false
  error: any = null

  constructor(
    private heroService: HeroService,
    private router: Router
  ) {}

  ngOnInit () {
    this.getHeroes()
  }

  getHeroes () {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes)
  }

  onSelect (hero: Hero) {
    this.selectedHero = hero
    this.addingHero = false
  }

  gotoDetail () {
    this.router.navigate([
      'HeroDetail',
      { id: this.selectedHero.id }
    ])
  }

  addHero () {
    this.addingHero = true
    this.selectedHero = null
  }

  close (savedHero: Hero) {
    this.addingHero = false
    if (savedHero) { this.getHeroes() }
  }

  deleteHero (hero: Hero, event: any) {
    event.stopPropagation()
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero)
        if (this.selectedHero == hero) { this.selectedHero = null }
      })
      .catch(err => this.error = err)
  }
}