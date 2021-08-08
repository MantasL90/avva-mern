import {
  HOUSES_LIST_FAIL,
  HOUSES_LIST_REQUEST,
  HOUSES_LIST_SUCCESS,
  HOUSES_CREATE_FAIL,
  HOUSES_CREATE_REQUEST,
  HOUSES_CREATE_SUCCESS,
  HOUSES_UPDATE_REQUEST,
  HOUSES_UPDATE_SUCCESS,
  HOUSES_UPDATE_FAIL,
  HOUSES_DELETE_REQUEST,
  HOUSES_DELETE_SUCCESS,
  HOUSES_DELETE_FAIL,
} from "../constants/houseConstants";
import axios from "axios";

export const listHouses = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOUSES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/`, config);

    dispatch({
      type: HOUSES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: HOUSES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createHouseAction =
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: HOUSES_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/create`,
        {
          title,
          content,
          category,
        },
        config
      );

      dispatch({
        type: HOUSES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: HOUSES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateHouseAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({
        type: HOUSES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/${id}`,
        { title, content, category },
        config
      );

      dispatch({
        type: HOUSES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: HOUSES_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteHouseAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: HOUSES_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/${id}`, config);

    dispatch({
      type: HOUSES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: HOUSES_DELETE_FAIL,
      payload: message,
    });
  }
};
