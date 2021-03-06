'use strict'
import { provide } from '@angular/core'
import {
  InMemoryBackendConfig,
  InMemoryBackendService,
  SEED_DATA
} from 'angular2-in-memory-web-api'
import { InMemoryDataService } from './app/services/in-memory-data.service'
import { provideStore } from '@ngrx/store'

import { bootstrap } from '@angular/platform-browser-dynamic'
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http'

import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { ROUTER_PROVIDERS } from '@angular/router'

import { AppComponent } from './app/components/index'
import { heroes } from './app/reducers'
import { HttpJson } from './app/services'
import { HeroApi } from './app/services'
import { HeroActions } from './app/actions'

import './main.scss'

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: XHRBackend, useClass: InMemoryBackendService },
  { provide: SEED_DATA, useClass: InMemoryDataService },
  { provide: InMemoryBackendConfig, useValue: { delay: 100 } },
  provideStore({ heroes }),
  HeroActions,
  HttpJson,
  HeroApi
])
