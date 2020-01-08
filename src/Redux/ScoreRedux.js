import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  addScore: ['score'],
})

export const ScoreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  scoreData: [],
})

/* ------------- Reducers ------------- */
export const addScore = (state, {score}) => {
  let scores = _.cloneDeep(state.scoreData).concat(score)
  scores.sort((a,b) => a.localeCompare(b))
  return {...state, scoreData: scores}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_SCORE]: addScore
})
