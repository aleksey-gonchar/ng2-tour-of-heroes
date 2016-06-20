'use strict'

export class InMemoryDataService {
  createDb () {
    let heroes = require('../seeds/heroes')

    return { heroes }
  }
}
