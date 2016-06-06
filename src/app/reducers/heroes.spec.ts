import { describe, it, expect } from '@angular/core/testing'
const deepFreeze = require('deep-freeze')

import { heroes, HEROES_ACTION_TYPES, HEROES_INITIAL_STATE } from './heroes'

import { heroesMockJson } from '../seeds'

describe('Reducers: heroes', () => {
  it('should initialize', () => {
    let newState = heroes(undefined, { type: undefined })
    expect(newState).toEqual(HEROES_INITIAL_STATE)
  })

  it('create should succeed', () => {
    let stateBefore = HEROES_INITIAL_STATE

    deepFreeze(stateBefore)

    let stateAfter = heroes(stateBefore, {
      type: HEROES_ACTION_TYPES.CREATE,
      payload: heroesMockJson[0]
    })

    expect(stateAfter).toEqual([heroesMockJson[0]])
  })

  it('delete should succeed', () => {
    let stateBefore = [heroesMockJson[0], heroesMockJson[1]]

    deepFreeze(stateBefore)

    let stateAfter = heroes(stateBefore, {
      type: HEROES_ACTION_TYPES.DELETE,
      payload: heroesMockJson[1]
    })

    expect(stateAfter).toEqual([heroesMockJson[0]])
  })

  it('load should succeed', () => {
    let stateBefore = HEROES_INITIAL_STATE

    deepFreeze(stateBefore)

    let stateAfter = heroes(stateBefore, {
      type: HEROES_ACTION_TYPES.GET,
      payload: [heroesMockJson[0], heroesMockJson[1]]
    })

    expect(stateAfter).toEqual([heroesMockJson[0], heroesMockJson[1]])
  })
})
