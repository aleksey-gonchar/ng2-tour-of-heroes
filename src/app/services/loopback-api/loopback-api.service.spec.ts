'use strict'
import { it, inject, beforeEachProviders } from '@angular/core/testing'
import { LoopbackApi } from './loopback-api.service.ts'

interface Dummy {
  id?: string
  name: string
}

describe('Service: LoopbackApi', () => {

  beforeEachProviders(() => [LoopbackApi])

  it('should be defined', inject([LoopbackApi], (service: LoopbackApi<Dummy>) => {
    expect(service).toBeDefined()
  }))
})
