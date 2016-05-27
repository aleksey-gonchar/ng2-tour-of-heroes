'use strict'
import { provide } from '@angular/core'
import { InMemoryBackendService, InMemoryBackendConfig, SEED_DATA } from 'angular2-in-memory-web-api'
import { InMemoryDataService } from './services/in-memory-data.service'
import { provideStore } from '@ngrx/store'

import { bootstrap } from '@angular/platform-browser-dynamic'
import { XHRBackend, HTTP_PROVIDERS } from '@angular/http'

import { AppComponent } from './components/app/app'
import { heroes } from './reducers'
import { HttpJson } from './services/http-json.service'
import { HeroApi } from './services/hero-api.service'
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
