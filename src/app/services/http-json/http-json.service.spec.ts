import { beforeEachProviders, beforeEach, inject, it, expect } from '@angular/core/testing'
import {
  Http, HTTP_PROVIDERS,
  Response, ResponseOptions, RequestMethod, Headers
} from '@angular/http'
import { Observable } from 'rxjs'

import { HttpJson } from './http-json.service'

import { heroesMockJson } from '../../mocks'

let service: HttpJson
let http: Http
let mockOptions = {
  url: 'http://localhost:3000/api/heroes',
  headers: new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }),
  response: {
    result: heroesMockJson[0]
  }
}

describe('Service: HttpJson', () => {
  beforeEachProviders(() => [Http, HTTP_PROVIDERS])

  beforeEach(inject([Http], _http => {
    http = _http

    spyOn(http, 'request').and.returnValue(Observable.from([
      new Response(new ResponseOptions({
        body: mockOptions.response
      }))
    ]))

    service = new HttpJson(http)
  }))

  it('executeGet should execute a GET', () => {
    service
      .executeGet({
        url: mockOptions.url
      })
      .subscribe(res => {
        expect(http.request).toHaveBeenCalledTimes(1)
        let options = (<any>http.request).calls.mostRecent().args[0]
        expect(options.url).toBe(mockOptions.url)
        expect(options.method).toBe(RequestMethod.Get)
        expect(options.headers).toEqual(mockOptions.headers)
        expect(res).toEqual(mockOptions.response)
      })
  })

  it('executePut should execute a PUT', () => {
    service
      .executePut({
        url: mockOptions.url
      })
      .subscribe(res => {
        expect(http.request).toHaveBeenCalledTimes(1)
        let options = (<any>http.request).calls.mostRecent().args[0]
        expect(options.url).toBe(mockOptions.url)
        expect(options.method).toBe(RequestMethod.Put)
        expect(options.headers).toEqual(mockOptions.headers)
        expect(res).toEqual(mockOptions.response)
      })

  })

  it('executePost should execute a POST', () => {
    service
      .executePost({
        url: mockOptions.url
      })
      .subscribe(res => {
        expect(http.request).toHaveBeenCalledTimes(1)
        let options = (<any>http.request).calls.mostRecent().args[0]
        expect(options.url).toBe(mockOptions.url)
        expect(options.method).toBe(RequestMethod.Post)
        expect(options.headers).toEqual(mockOptions.headers)
        expect(res).toEqual(mockOptions.response)
      })

  })
  it('executePost should stringify body when it is an object', () => {
    service
      .executePost({
        url: mockOptions.url,
        body: {param: 12}
      })
      .subscribe(res => {
        expect(http.request).toHaveBeenCalledTimes(1)
        let options = (<any>http.request).calls.mostRecent().args[0]

        expect(options.url).toBe(mockOptions.url)
        expect(options.method).toBe(RequestMethod.Post)
        expect(options.headers).toEqual(mockOptions.headers)
        expect(options._body).toBe(JSON.stringify({param: 12}))
        expect(res).toEqual(mockOptions.response)
      })

  })

  it('executePost should not stringify body when it is already a string', () => {
    service
      .executePost({
        url: mockOptions.url,
        body: '{ "param": 12 }'
      })
      .subscribe(res => {
        expect(http.request).toHaveBeenCalledTimes(1)
        let options = (<any>http.request).calls.mostRecent().args[0]

        expect(options.url).toBe(mockOptions.url)
        expect(options.method).toBe(RequestMethod.Post)
        expect(options.headers).toEqual(mockOptions.headers)
        expect(options._body).toBe('{ "param": 12 }')
        expect(res).toEqual(mockOptions.response)
      })

  })

  it('executeDelete should execute a DELETE', () => {
    service
      .executeDelete({
        url: mockOptions.url
      })
      .subscribe(res => {
        expect(http.request).toHaveBeenCalledTimes(1)
        let options = (<any>http.request).calls.mostRecent().args[0]
        expect(options.url).toBe(mockOptions.url)
        expect(options.method).toBe(RequestMethod.Delete)
        expect(options.headers).toEqual(mockOptions.headers)
        expect(res).toEqual(mockOptions.response)
      })
  })
})
