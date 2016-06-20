'use strict'
import { Injectable } from '@angular/core'

import { Hero } from '../../interfaces'
import { LoopbackApi } from '../loopback-api'
import { HttpJson } from '../http-json'

@Injectable()
export class HeroApi extends LoopbackApi<Hero> {
  constructor(httpJson: HttpJson) {
    super()
    this.httpJson = httpJson
    this.endpoint = 'heroes'
  }
}
