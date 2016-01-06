import { SUB_PACKS } from '../constants/Constants'

export default function reduce(state = {}, action) {
  switch (action.type) {
    case SUB_PACKS:
      return state
    default:
      return state
  }
}
