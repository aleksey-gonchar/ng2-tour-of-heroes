'use strict'

import { Hero } from './hero.interface'

export interface AppStore {
  heroes: Array<Hero>
}