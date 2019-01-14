import { Action } from "redux";

export enum types {
  LOAD_IMAGES = 'LOAD_IMAGES',
  LOAD_IMAGES_SUCCESS = 'LOAD_IMAGES_SUCCESS',
}

export const loadImages = (): Action => ({
  type: types.LOAD_IMAGES,
});

export const loadImagesSuccess = (categoryMapping: any): any => ({
  type: types.LOAD_IMAGES_SUCCESS,
  categoryMapping,
});