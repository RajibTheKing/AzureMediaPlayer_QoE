export interface RootState {
  version: string;
}

export type StatisticsState = {
  loading: boolean;
  availableFrameSizes: [];
  availableBitrates: [];
  bitrateChangedTimestamps: [];
};
