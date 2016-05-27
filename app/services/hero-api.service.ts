'use strict'

import { Injectable } from '@angular/core'

import { Hero } from '../interfaces'
import { LoopbackApi } from './loopback-api.service'
import { HttpJson } from './http-json.service'

@Injectable()
export class HeroApi extends LoopbackApi<Hero> {
  constructor(httpJson:HttpJson) {
    this.httpJson = httpJson
    this.endpoint = 'heroes'
    super()
  }
}
