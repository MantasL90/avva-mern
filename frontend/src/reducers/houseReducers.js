import {
  HOUSES_LIST_REQUEST,
  HOUSES_LIST_SUCCESS,
  HOUSES_LIST_FAIL,
  HOUSES_CREATE_REQUEST,
  HOUSES_CREATE_SUCCESS,
  HOUSES_CREATE_FAIL,
  HOUSES_UPDATE_REQUEST,
  HOUSES_UPDATE_SUCCESS,
  HOUSES_UPDATE_FAIL,
  HOUSES_DELETE_REQUEST,
  HOUSES_DELETE_SUCCESS,
  HOUSES_DELETE_FAIL,
} from "../constants/houseConstants";

export const houseListReducer = (state = { houses: [] }, action) => {
  switch (action.type) {
    case HOUSES_LIST_REQUEST:
      return {};
    case HOUSES_LIST_SUCCESS:
      return { houses: action.payload };
    case HOUSES_LIST_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const houseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSES_CREATE_REQUEST:
      return {};
    case HOUSES_CREATE_SUCCESS:
      return { success: true };
    case HOUSES_CREATE_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const houseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSES_UPDATE_REQUEST:
      return {};
    case HOUSES_UPDATE_SUCCESS:
      return { success: true };
    case HOUSES_UPDATE_FAIL:
      return { error: action.payload, success: false };
    default:
      return state;
  }
};

export const houseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HOUSES_DELETE_REQUEST:
      return {};
    case HOUSES_DELETE_SUCCESS:
      return { success: true };
    case HOUSES_DELETE_FAIL:
      return { error: action.payload, success: false };
    default:
      return state;
  }
};
