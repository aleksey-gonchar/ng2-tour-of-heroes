import { Component, ComponentResolver, provide } from '@angular/core'
import { Location } from '@angular/common'
import {
  DefaultRouterUrlSerializer,
  Router,
  RouterOutletMap,
  RouterUrlSerializer
} from '@angular/router'
import {
  beforeEachProviders,
  describe, xdescribe,
  expect,
  fakeAsync,
  inject, injectAsync,
  it,
  tick
} from '@angular/core/testing'
import { SpyLocation } from '@angular/common/testing'
import { TestComponentBuilder } from '@angular/compiler/testing'

import { AppComponent } from './app'
import { HeroesComponent } from '../heroes'
import { DashboardComponent } from '../dashboard'
import { HeroDetailComponent } from '../hero-detail'

import { HeroActions } from '../../actions/hero.actions'

@Component({
  selector: 'big-table-container',
  template: '<div>HeroesComponentMock</div>'
})
class HeroesComponentMock { }

@Component({
  selector: 'big-table-container',
  template: '<div>DashboardComponentMock</div>'
})
class DashboardComponentMock { }

@Component({
  selector: 'big-table-container',
  template: '<div>HeroDetailComponentMock</div>'
})
class HeroDetailComponentMock { }

fdescribe('Component: AppComponent', () => {
  beforeEachProviders(() => [
    RouterOutletMap,
    { provide: Location, useClass: SpyLocation },
    { provide: RouterUrlSerializer, useClass: DefaultRouterUrlSerializer },
    { provide: Router,
      deps: [ComponentResolver, RouterUrlSerializer, RouterOutletMap, Location],
      useFactory: (resolver, urlParser, outletMap, location) =>
        new Router('App', AppComponent, resolver, urlParser, outletMap, location)
    }
  ])

  it('should be able to navigate to `/` using commands API', fakeAsync(inject(
    [Router, Location, TestComponentBuilder],
    (router: Router, location: Location, tcb: TestComponentBuilder) => {
      tcb.createFakeAsync(AppComponent)
      router.navigate(['/'])
      tick()

      expect(location.path()).toBe('')
    }
  )))

  // xit('should be able to navigate to `Dashboard` using commands API', fakeAsync(inject(
  //   [Router, Location, TestComponentBuilder],
  //   (router: Router, location: Location, tcb: TestComponentBuilder) => {
  //     tcb.createFakeAsync(AppComponent)
  //     router.navigate(['/dashboard'])
  //     tick()
  //
  //     expect(location.path()).toBe('dashboard')
  //   }
  // )))


  // it('should be defined', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
  //   return tcb
      // .overrideDirective(AppComponent, HeroesComponent, HeroesComponentMock)
      // .overrideDirective(AppComponent, DashboardComponent, DashboardComponentMock)
      // .overrideDirective(AppComponent, HeroDetailComponent, HeroDetailComponentMock)
      // .createAsync(AppComponent)
      // .then((fixture) => {
      //   fixture.detectChanges()
      //
      //   let element = fixture.debugElement.nativeElement
      //   let cmpInstance = fixture.debugElement.componentInstance
      //
      //   expect(cmpInstance).toBeDefined()
      //   expect(element).toBeDefined()
      // })
  // }))

})
