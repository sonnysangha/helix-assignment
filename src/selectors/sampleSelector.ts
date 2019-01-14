import { AppState } from './../reducers/rootReducer';

export const getImages = (state: AppState) => state.sample.images;