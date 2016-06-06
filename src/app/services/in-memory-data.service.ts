'use strict'

export class InMemoryDataService {
  createDb () {
    let heroes = require('../mocks/heroes')

    return { heroes }
  }
}
