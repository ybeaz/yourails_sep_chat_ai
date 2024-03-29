import { createSyncActions, CreateSyncAction } from './createActionsSync'
import { createAsyncAction, CreateAsyncAction } from './createActionsAsync'

/** @description  Synchroneours redux actions */
const ACTIONS_SYNC: string[] = [
  'ADD_NAVIGATION_MOBILE',
  'REVOKE_USERID_DATA_AWS_COGNITO',
  'SET_USERID_DATA_AWS_COGNITO',
  'REMOVE_LAST_MESSAGE_ID_PROFILE',
  'SET_ID_USER_HOST',
  'SET_ID_PROFILE_HOST',
  'TOGGLE_PROFILE_SELECT_MENU',
  'TOGGLE_IS_USER_MENU',
  'ADD_MESSAGE',
  'ADD_MESSAGES',
  'ADD_PROJECTS',
  'ADD_COMPETENCY_TAGS',
  'ADD_SECTIONS_MAPPING',
  'SET_INPUT_SEARCH',
  'SET_INPUT_CHAT',
  'SET_ID_PROFILE_ACTIVE',
  'TOGGLE_IS_MAIN_COLUMN_BLANK',
  'TOGGLE_IS_SHOW_GLOBAL',
  'ADD_PROFILES',
  'SET_ID_USER_HOST',
  'TOGGLE_IS_MAIN_COLUMN',
  'TOGGLE_IS_LEFT_COLUMN',
  'SET_MODAL_FRAME',
  'TOGGLE_LOADER_OVERLAY', // TODO
  'SET_THEME', // TODO
  'TEMPLATE',
]

/** @description Asynchroneous actions for saga */
const ACTION_ASYNC: string[] = [
  'TEMPLATE_ASYNC',
  'GET_PROFILES_ASYNC',
  'GET_AUTH_AWS_COGNITO_USER_REVOKED',
  'GET_AUTH_AWS_COGNITO_USER_REFRESHED',
  'GET_AUTH_AWS_COGNITO_USER_DATA',
  'ADD_COMPETENCY_TAGS_ASYNC',
  'ADD_PROJECTS_ASYNC',
  'INIT_LOADING_ASYNC',
  'ADD_MESSAGES_ASYNC',
]

export const actionSync: CreateSyncAction = createSyncActions(ACTIONS_SYNC)
export const actionAsync: CreateAsyncAction = createAsyncAction(ACTION_ASYNC)

// Example of the sync action
// export const TEST_ACTION: Function = (data: any = true): ActionType => ({
//   type: 'TEST_ACTION',
//   data,
// })
