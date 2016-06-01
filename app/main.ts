'use strict'
import { provide } from '@angular/core'
import { InMemoryBackendService, InMemoryBackendConfig, SEED_DATA } from 'angular2-in-memory-web-api'
import { InMemoryDataService } from './services/in-memory-data.service'
import { provideStore } from '@ngrx/store'

import { bootstrap } from '@angular/platform-browser-dynamic'
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http'

import { AppComponent } from './components/index'
import { heroes } from './reducers'
import { HttpJson } from './services'
import { HeroApi } from './services'
import { HeroActions } from './actions'


bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  provide(XHRBackend, { useClass: InMemoryBackendService }),
  provide(SEED_DATA, { useClass: InMemoryDataService }),
  provide(InMemoryBackendConfig, { useValue: { delay: 100 } }),
  provideStore({ heroes }),
  HeroActions,
  HttpJson,
  HeroApi
])
