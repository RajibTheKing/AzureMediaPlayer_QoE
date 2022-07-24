import { ActionTree } from 'vuex'
import { OK } from '@/middlewares/httpClient'
import { StatisticsState, RootState } from '@/model/model'

import {
  SubmitStatistics,
  SubmitSelectedBitrate,
} from './apis'

export const actions: ActionTree<StatisticsState, RootState> = {

  async SubmitStatistics ({ commit, dispatch }, { statistics }): Promise<any> {
    console.log("SubmitStatistics: ", statistics);
    await SubmitStatistics(statistics)
      .then(({ status, data }) => {
        if (status === OK) {
          console.log('WARNING FROM QoE SERVICE: ', data)
        }
      })
      .catch((e : any) => {
        console.log(e)
      })
  },

  async SubmitSelectedBitrate ({ commit, dispatch }, { obj }): Promise<any> {
    console.log("SubmitSelectedBitrate: ", obj);
    await SubmitSelectedBitrate(obj)
      .then(({ status, data }) => {
        if (status === OK) {
          console.log('WARNING FROM QoE SERVICE: ', data)
        }
      })
      .catch((e : any) => {
        console.log(e)
      })
  },
  saveAvailableBitrates ({ commit, dispatch }, { bitrates }): void {
    console.log("inside saveAvailableBitrates: ", bitrates);
    commit('MUTATE_SET_AVAILABLE_BITRATES', bitrates)
  },

  saveAvailableFrameSizes ({ commit, dispatch }, { framesizes }): void{
    commit('MUTATE_SET_AVAILABLE_FRAME_SIZES', framesizes)
  },

  saveBitrateChangeTimestamps ({ commit, dispatch }, { bitrateChanegdTimestamps }): void{
    commit('MUTATE_SET_BITRATE_CHANGED_TIMESTAMPS', bitrateChanegdTimestamps)
  },

  saveBufferingStats({ commit, dispatch }, { bufferingStats }): void{
    commit('MUTATE_SET_BUFFERING_STATS', bufferingStats)
  },

  saveHeuristicProfile({ commit, dispatch }, { profile }): void{
    commit('MUTATE_SET_HEURISTIC_PROFILE', profile)
  }

}
