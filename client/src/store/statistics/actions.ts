import { ActionTree } from 'vuex'
import { OK } from '@/middlewares/httpClient'
import { StatisticsState, RootState } from '@/model/model'

import {
  SubmitStatistics,
} from './apis'

export const actions: ActionTree<StatisticsState, RootState> = {

  async SubmitStatistics ({ commit, dispatch }, { stats }): Promise<any> {

    await SubmitStatistics(stats)
      .then(({ status, data }) => {
        if (status === OK) {
          console.log('Create Task ... data from server: ', data)
          //commit('MUTATE_CREATE_TASK', task)
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

  saveBitrateChangeTimestamps ({ commit, dispatch }, { timestamps }): void{
    commit('MUTATE_SET_BITRATE_CHANGED_TIMESTAMPS', timestamps)
  },

  saveBufferingStats({ commit, dispatch }, { bufferingStats }): void{
    commit('MUTATE_SET_BUFFERING_STATS', bufferingStats)
  }

}
