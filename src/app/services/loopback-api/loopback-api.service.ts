import { Injectable } from '@angular/core'
import { HttpJson } from '../http-json'
import { Observable } from 'rxjs'

const BASE_URL = 'http://localhost:3000/api'

interface PersistedModel {
  id?: string
}

@Injectable()
export class LoopbackApi<T extends PersistedModel> {

  protected endpoint: string
  protected httpJson: HttpJson

  getAll(): Observable<Array<T>> {
    return this.httpJson.executeGet({
      url: `${BASE_URL}/${this.endpoint}`
    })
  }

  create(entity: T): Observable<T> {
    return this.httpJson.executePost({
      url: `${BASE_URL}/${this.endpoint}`,
      body: entity
    })
  }

  delete(entity: T): Observable<any> {
    return this.httpJson.executeDelete({
      url: `${BASE_URL}/${this.endpoint}/${entity.id}`
    }).map(res => entity)
  }

  update(entity: T): Observable<any> {
    return this.httpJson.executePut({
      url: `${BASE_URL}/${this.endpoint}/${entity.id}`
    }).map(res => entity)
  }
}
