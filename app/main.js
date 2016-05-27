'use strict';
const core_1 = require('@angular/core');
const angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
const in_memory_data_service_1 = require('./services/in-memory-data.service');
const store_1 = require('@ngrx/store');
const platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
const http_1 = require('@angular/http');
const app_1 = require('./components/app/app');
const reducers_1 = require('./reducers');
const http_json_service_1 = require('./services/http-json.service');
const hero_api_service_1 = require('./services/hero-api.service');
const actions_1 = require('./actions');
platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [
    http_1.HTTP_PROVIDERS,
    core_1.provide(http_1.XHRBackend, { useClass: angular2_in_memory_web_api_1.InMemoryBackendService }),
    core_1.provide(angular2_in_memory_web_api_1.SEED_DATA, { useClass: in_memory_data_service_1.InMemoryDataService }),
    core_1.provide(angular2_in_memory_web_api_1.InMemoryBackendConfig, { useValue: { delay: 100 } }),
    store_1.provideStore({ heroes: reducers_1.heroes }),
    actions_1.HeroActions,
    http_json_service_1.HttpJson,
    hero_api_service_1.HeroApi
]);
//# sourceMappingURL=main.js.map