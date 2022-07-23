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
  }

}
