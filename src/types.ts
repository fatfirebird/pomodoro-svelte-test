/* eslint-disable no-unused-vars */

export enum BACKGROUND_ACTION {
  GET_SETTINGS = 'GET_SETTINGS',
  SET_SETTINGS = 'SET_SETTINGS',
}

export type TBackgroundRequest = {
  action: BACKGROUND_ACTION;
  data: any;
};
