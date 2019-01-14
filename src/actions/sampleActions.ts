import { Action } from "redux";

export enum types {
  START_LOADING = 'START_LOADING',
  STOP_LOADING = 'STOP_LOADING',
}

export const startLoading = (): Action => ({
  type: types.START_LOADING,
});

export const stopLoading = (): Action => ({
  type: types.STOP_LOADING,
});