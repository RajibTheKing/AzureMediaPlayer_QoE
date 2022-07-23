import { GetterTree } from 'vuex'
import { StatisticsState, RootState } from '../../model/model'

export const getters: GetterTree<StatisticsState, RootState> = {
  getStatistics (state) : any{
    return state;
  }
}
