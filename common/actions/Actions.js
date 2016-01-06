import * as types from '../constants/Constants'
import 'isomorphic-fetch'
import { pushState } from 'redux-router'

const apiServer = __API_SERVER__

function request(email, packs) {
  return {
    type: types.REQUEST_SUBSCRIBE,
    email,
    packs
  }
}

function success(result) {
  return {
    type: types.SUCCESS,
    result
  }
}

function failure(result) {
  return {
    type: types.FAILURE,
    result
  }
}

export function subscribePacks(email, packs) {
  packs = packs.trim()
  if (packs !== '') {
    packs = packs.split('\n')
  } else {
    packs = []
  }
  return (dispatch) => {
    dispatch(request({ email, packs }))
    return fetch(`${apiServer}/api/subscribe`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        packs
      })
    })
    .then(response => response.json())
    .then(result => {
      dispatch(success(result))
      dispatch(pushState({result}, '/result'))
    })
    .catch(err => dispatch(failure(err)))
  }
}

export function confirm(email, token) {
  return (dispatch) => {
    dispatch({
      type: types.REQUEST_CONFIRM
    })
    return fetch(`${apiServer}/api/confirm?email=${email}&token=${token}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      dispatch(success(result))
      dispatch(pushState({result}, '/result'))
    })
    .catch(err => dispatch(failure(err)))
  }
}
