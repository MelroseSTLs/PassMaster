import * as types from '../actions/types'

export function resetUser(){
  return dispatch => {
    dispatch({
      type: types.RESET_USER_ID
    });
    dispatch({
      type: types.RESET_USER_NAME
    });
    dispatch({
      type: types.RESET_USER_AVATAR
    });
    dispatch({
      type: types.LOGOUT
    });
    dispatch({
      type: types.RESET_USER_EMAIL
    });
  }
}

export function setUser(name, id, avatar, email){
  return dispatch => {
    dispatch({
      type: types.SET_USER_ID,
      payload: id
    });
    dispatch({
      type: types.SET_USER_AVATAR,
      payload:avatar
    });
    dispatch({
      type: types.SET_USER_NAME,
      payload: name
    });
    dispatch({
      type: types.SET_USER_EMAIL,
      payload: email
    });
    dispatch({
      type: types.LOGIN
    })
  }
}