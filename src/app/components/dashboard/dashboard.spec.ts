import { xdescribe, it, injectAsync, beforeEachProviders } from '@angular/core/testing'
import { TestComponentBuilder } from '@angular/compiler/testing'
import { Component } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { provide } from '@angular/core'

import { DashboardComponent } from './dashboard'
import { Hero } from '../../interfaces'
import { HeroActions } from '../../actions'

import { heroesMockJson } from '../../seeds'

class HeroActionsMock {
  heroes$: BehaviorSubject<Array<Hero>>

  constructor() {
    this.heroes$ = new BehaviorSubject<Array<Hero>>([])
  }

  getAll() {
    this.heroes$.next(heroesMockJson)
  }
}

xdescribe('Component: DashboardComponent', () => {
  beforeEachProviders(() => [
    provide(HeroActions, { useClass: HeroActionsMock })
  ])

  it('should be defined', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.createAsync(DashboardComponent)
      .then((fixture) => {
        fixture.detectChanges()

        let element = fixture.debugElement.nativeElement
        let cmpInstance = <DashboardComponent>fixture.debugElement.componentInstance

        expect(cmpInstance).toBeDefined()
        expect(element).toBeDefined()

        let els = element.querySelectorAll('li')
        expect(els.length).toBe(2)
      })
  }))

})
