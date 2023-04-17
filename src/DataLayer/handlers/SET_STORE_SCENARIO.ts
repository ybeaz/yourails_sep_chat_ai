import { store } from '../store'
import { ActionEventType } from '../../@types/ActionEventType'
import { ProfileType } from '../../@types/ProfileType'
import { actionSync, actionAsync } from '../../DataLayer/index.action'
import { getParsedUrlQuery } from '../../Shared/getParsedUrlQuery'
import { DeviceType } from '../../YrlNativeViewLibrary'
import { getSetStoreScenario } from '../../Shared/getSetStoreScenario'

const { dispatch, getState } = store

/**
 * @description Handle to setup initial data based on the device type and URL
  xsDevice = DeviceTypeIn['xsDevice'],
  smDevice = DeviceTypeIn['smDevice'],
  mdDevice = DeviceTypeIn['mdDevice'],
  lgDevice = DeviceTypeIn['lgDevice'],
  xlDevice = DeviceTypeIn['xlDevice'],
 */

export const SET_STORE_SCENARIO: ActionEventType = (
  event,
  dataHandle: {
    pathname: string
    hash: string
    deviceType: DeviceType
  }
) => {
  const { pathname, hash, deviceType } = dataHandle

  const {
    componentsState: { isSidebarRight, isMainColumn },
    globalVars: { idUserHost },
    profiles,
  } = getState()

  console.info('SET_STORE_SCENARIO [19]', {
    pathname,
    deviceType,
  })

  const {
    caseNo,
    isShowAppNext,
    idUserNext,
    isSidebarRightNext,
    isMainColumnNext,
    isMainColumnBlankNext,
    modalFrameNext,
  } = getSetStoreScenario({
    profiles,
    pathname,
    hash,
    deviceType,
    isSidebarRight,
    isMainColumn,
  })

  console.info('SET_STORE_SCENARIO [215]', {
    caseNo,
    isShowAppNext,
    idUserNext,
    isSidebarRightNext,
    isMainColumnNext,
    isMainColumnBlankNext,
    modalFrameNext,
  })

  dispatch(actionSync.TOGGLE_IS_SHOW_GLOBAL(isShowAppNext))
  dispatch(actionSync.TOGGLE_SIDEBAR_RIGHT(isSidebarRightNext))
  dispatch(actionSync.TOGGLE_IS_MAIN_COLUMN(isMainColumnNext))
  dispatch(actionSync.TOGGLE_IS_MAIN_COLUMN_BLANK(isMainColumnBlankNext))
  dispatch(actionSync.SET_MODAL_FRAME(modalFrameNext))

  if (idUserHost === idUserNext) return

  dispatch(
    actionSync.SET_ID_USER_HOST({
      idUser: idUserNext,
    })
  )
}
