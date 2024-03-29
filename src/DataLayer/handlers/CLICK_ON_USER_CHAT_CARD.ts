import { store } from '../store'
import { ActionEventType } from '../../@types/ActionEventType'
import { actionSync } from '../../DataLayer/index.action'
import { getPathNameForReplace } from '../../Shared/getPathNameForReplace'
import { getRedirected } from '../../Shared/getRedirected'
import { getSocketEmitJoinConversation } from '../../CommunicationLayer/socketio/getSocketEmitJoinConversation'

const { dispatch, getState } = store

export const CLICK_ON_USER_CHAT_CARD: ActionEventType = (event, data) => {
  const {
    globalVars: { navigation },
  } = getState()

  const { profileID, profileName, urlParam1, urlParam2, query, platformOS } =
    data

  const {
    globalVars: { profileHostID },
  } = getState()

  dispatch(
    actionSync.SET_ID_PROFILE_ACTIVE({
      profileActiveID: profileID,
    })
  )

  getSocketEmitJoinConversation(profileHostID, profileID)

  if (platformOS === 'web') {
    const getPathNameForReplaceProps = {
      urlParam1,
      urlParam2,
      profileName,
      query,
    }
    const pathnameNext = getPathNameForReplace(getPathNameForReplaceProps)
    getRedirected(pathnameNext, { platformOS, replace: true })
  } else {
    navigation.navigate('ChatSpaceScreen')
  }
}
