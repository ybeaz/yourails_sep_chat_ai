import { takeLatest, takeEvery, put, select } from 'redux-saga/effects'

import { actionSync, actionAsync } from '../../DataLayer/index.action'
import { templateConnectorAxios } from '../../CommunicationLayer/template.connector'
import { GetRecipeDocument } from '../../types/graphql'
import { apolloClient } from '../../CommunicationLayer/clients/apolloClient'
import { competencyTags } from '../../ContentMock/competencyTagsMock'

function* addCompetencyTags(input: any) {
  const { data: variables } = input

  try {
    yield put(actionSync.ADD_COMPETENCY_TAGS({ competencyTags }))
  } catch (error) {
    const err: any = error
  }
}

export default function* addCompetencyTagsSaga() {
  yield takeEvery(
    [actionAsync.ADD_COMPETENCY_TAGS_ASYNC.REQUEST().type],
    addCompetencyTags
  )
}
