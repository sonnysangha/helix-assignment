import { types } from '../actions/sampleActions';
import { AnyAction } from 'redux';

import * as data from '../data';


export type sampleReducerState = {
  categoryMapping: any;
  images: any[];
}

const initialState: sampleReducerState = {
  categoryMapping: [],
  images: data.default.imageFiles,
};

const sampleReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.LOAD_IMAGES_SUCCESS:
      console.log('MADE IT TO THE REDUCER > ', action);
      return { ...state, categoryMapping: action.categoryMapping };
    default:
      return state;
  }
};

export default sampleReducer;