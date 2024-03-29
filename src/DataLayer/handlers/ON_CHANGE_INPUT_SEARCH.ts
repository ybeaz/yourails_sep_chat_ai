import { store } from '../store'
import { ActionEventType } from '../../@types/ActionEventType'
import { actionSync, actionAsync } from '../../DataLayer/index.action'

const { dispatch, getState } = store

export const ON_CHANGE_INPUT_SEARCH: ActionEventType = (event, data) =>
  dispatch(actionSync.SET_INPUT_SEARCH(data))
