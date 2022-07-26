import { StatisticsState } from '@/model/model'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<StatisticsState> = {
  
  MUTATE_SET_AVAILABLE_FRAME_SIZES (state, data: any) {
    state.availableFrameSizes = data;
  },

  MUTATE_SET_AVAILABLE_BITRATES (state, data: any) {
    state.availableBitrates = data;
  },

  MUTATE_SET_BITRATE_CHANGED_TIMESTAMPS (state, data: any) {
    state.bitrateChangedTimestamps = data;
  },

  MUTATE_SET_BUFFERING_STATS (state, data: any) {
    state.bufferingStats = data;
  },

  MUTATE_SET_HEURISTIC_PROFILE (state, data: any) {
    state.heuristicProfile = data;
  },
}
