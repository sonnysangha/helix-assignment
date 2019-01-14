import { types } from '../actions/sampleActions';
import { AnyAction } from 'redux';

import * as data from '../data';

export type sampleReducerState = {
  images: any[];
  loading: boolean
}

const initialState: sampleReducerState = {
  images: data.default.imageFiles,
  loading: false,
};

const sampleReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.START_LOADING:
      return { ...state, loading: true };
    case types.STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default sampleReducer;