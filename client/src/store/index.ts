import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '../model/model'
import { statistics } from './statistics/index'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '0.1.0'
  },
  modules: {
    statistics
  }

}

export default new Vuex.Store<RootState>(store)
