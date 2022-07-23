import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'

import {RootState, StatisticsState } from '../../model/model'

export const state: StatisticsState = {
  loading: false,
  availableBitrates: [],
  availableFrameSizes: []
}

export const statistics: Module<StatisticsState, RootState> = {
  state,
  getters,
  actions,
  mutations
}
