import {
  fdescribe, xdescribe, it,
  injectAsync, beforeEachProviders
} from '@angular/core/testing'
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

fdescribe('Component: DashboardComponent', () => {
  let location
  let router

  beforeEachProviders(() => [
    RouteRegistry,
    provide(Location, {useClass: SpyLocation}),
    provide(HeroActions, { useClass: HeroActionsMock }),
    provide(Router, {useClass: RootRouter}),
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App})
  ])

  beforeEach(inject([Router, Location], (r, l) => {
    router = r
    location = l
  }))
  
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

  it('Should be able to navigate to Dashboard', done => {
    router.navigate(['dashboard']).then(() => {
      expect(location.path()).toBe('/dashboard')
      done()
    }).catch(e => done.fail(e))
  })

  it('should redirect not registered urls to Dashboard', done => {
    router.navigateByUrl('/unknown').then(() => {
      expect(location.path()).toBe('/Dashboard')
      done()
    }).catch(e => done.fail(e))
  })
})
