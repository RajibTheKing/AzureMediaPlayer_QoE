import { StatisticsState } from '@/model/model'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<StatisticsState> = {
  
  MUTATE_SET_AVAILABLE_FRAME_SIZES (state, data: any) {
    state.availableFrameSizes = data;
  },

  MUTATE_SET_AVAILABLE_BITRATES (state, data: any) {
    state.availableBitrates = data;
  },

  MUTATE_ADD_BITRATE_CHANGED_TIMESTAMP (state, data: any) {
    state.bitrateChangedTimestamps = data;
  },
}
