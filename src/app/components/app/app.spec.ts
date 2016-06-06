import {
  describe, it, expect,
  injectAsync, beforeEachProviders,
  setBaseTestProviders
} from '@angular/core/testing'
import { TestComponentBuilder } from '@angular/compiler/testing'
import { Component, provide } from '@angular/core'
import { ROUTER_FAKE_PROVIDERS } from '@angular/router/testing'

import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
} from '@angular/platform-browser-dynamic/testing'
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS)


import { AppComponent } from './app.ts'
import { HeroesComponent } from '../heroes/heroes'
import { DashboardComponent } from '../dashboard/dashboard'
import { HeroDetailComponent } from '../hero-detail/hero-detail'

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

describe('Component: AppComponent', () => {
  beforeEachProviders(() => [ROUTER_FAKE_PROVIDERS])

  it('should be defined', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb
      // .overrideDirective(AppComponent, HeroesComponent, HeroesComponentMock)
      // .overrideDirective(AppComponent, DashboardComponent, DashboardComponentMock)
      // .overrideDirective(AppComponent, HeroDetailComponent, HeroDetailComponentMock)
      .createAsync(AppComponent)
      .then((fixture) => {
        fixture.detectChanges()

        let element = fixture.debugElement.nativeElement
        let cmpInstance = fixture.debugElement.componentInstance

        expect(cmpInstance).toBeDefined()
        expect(element).toBeDefined()
      })
  }))

})
