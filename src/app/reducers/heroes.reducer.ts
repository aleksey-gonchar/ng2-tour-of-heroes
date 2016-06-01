'use strict'
import { Action } from '@ngrx/store'

import { Hero } from '../interfaces'

export let HEROES_ACTION_TYPES = {
  CREATE: 'CREATE_HERO',
  DELETE: 'DELETE_HERO',
  UPDATE: 'UPDATE_HERO',
  GET_ALL: 'GET_ALL_HEROES',
  GET: 'GET_HERO',
}

export let HEROES_INITIAL_STATE = []

export const heroes = (state: Array<Hero> = HEROES_INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case HEROES_ACTION_TYPES.CREATE:
      return [...state, action.payload]

    case HEROES_ACTION_TYPES.DELETE:
      return state.filter(hero => hero.id !== action.payload.id)

    case HEROES_ACTION_TYPES.GET_ALL:
      return action.payload

    case HEROES_ACTION_TYPES.GET:
      return action.payload
  }
}
