import { delay, call, takeEvery, put, select } from 'redux-saga/effects'

import { ProfileType } from '../../@types/ProfileType'
import {
  getFilteredObjsArrayBy,
  OperatorType,
} from '../../Shared/getFilteredObjsArrayBy'
import { actionSync, actionAsync } from '../../DataLayer/index.action'
import { templateConnectorAxios } from '../../CommunicationLayer/template.connector'
import { profiles as profilesIn } from '../../ContentMock/profilesMock'
import { sectionsMapping } from '../../ContentMock/sectionsMappingMock'
import { getSocketEmitJoinConversation } from '../../CommunicationLayer/socketio/getSocketEmitJoinConversation'
import { getJoinedConversation } from '../../Shared/getJoinedConversation'
// import { GetRecipeDocument } from '../../types/graphql'
// import { apolloClient } from '../../CommunicationLayer/clients/apolloClient'

function* initLoading(input: any) {
  const { data } = input

  const { profiles: profilesPrev, sectionsMapping: sectionsMappingPrev } =
    yield select(store => store)
  if (profilesPrev.length && sectionsMappingPrev.length) return

  try {
    yield put(actionSync.ADD_PROFILES({ profiles: profilesIn }))
    yield put(actionSync.ADD_SECTIONS_MAPPING({ sectionsMapping }))

    const {
      profiles,
      globalVars: { idProfileHost },
    } = yield select(store => store)

    const profileHost: ProfileType = getFilteredObjsArrayBy(
      profiles,
      'idProfile',
      idProfileHost,
      OperatorType['===']
    )[0] as ProfileType

    const getJoinedConversationProps = {
      profilesIn,
      profileHostIn: profileHost,
      getSocketEmitJoinConversationIn: getSocketEmitJoinConversation,
    }
    yield call(getJoinedConversation, getJoinedConversationProps)
  } catch (error: any) {
    console.log('initLoadingSaga [81]', { message: error.message })
  }
}

export default function* initLoadingSaga() {
  yield takeEvery([actionAsync.INIT_LOADING_ASYNC.REQUEST().type], initLoading)
}