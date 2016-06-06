import {
  describe, it,
  beforeEach, beforeEachProviders,
  expect,
  inject
} from '@angular/core/testing'
import { Http, HTTP_PROVIDERS, ConnectionBackend } from '@angular/http'

import { HttpJson } from '../http-json'
import { HeroApi } from './hero-api.service'
import { Observable } from 'rxjs'

import { heroesMockJson } from '../../mocks'

let mockResults = {
  all: heroesMockJson,
  create: heroesMockJson[0],
  delete: heroesMockJson[1]
}

describe('Service: HeroApi', () => {
  let service: HeroApi
  let httpJson: HttpJson

  beforeEachProviders(() => [
    Http, HTTP_PROVIDERS,
    ConnectionBackend,
    HttpJson
  ])

  beforeEach(inject([HttpJson], _httpJson => {
    httpJson = _httpJson

    spyOn(httpJson, 'executeGet').and.returnValue(Observable.from([
      mockResults.all
    ]))

    spyOn(httpJson, 'executePost').and.returnValue(Observable.from([
      mockResults.create
    ]))

    spyOn(httpJson, 'executeDelete').and.returnValue(Observable.from([
      mockResults.delete
    ]))

    service = new HeroApi(httpJson)
  }))

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('getAll should succeed', () => {
    service
      .getAll()
      .subscribe(res => {
        expect(httpJson.executeGet).toHaveBeenCalledTimes(1)
        expect(res).toEqual(mockResults.all)
      })
  })

  it('create should succeed', () => {
    service
      .create(mockResults.create)
      .subscribe(res => {
        expect(httpJson.executePost).toHaveBeenCalledTimes(1)
        expect(res).toEqual(mockResults.create)
      })
  })

  it('delete should succeed', () => {
    service
      .delete(mockResults.delete)
      .subscribe(res => {
        expect(httpJson.executeDelete).toHaveBeenCalledTimes(1)
        expect(res).toEqual(mockResults.delete)
      })
  })
})
