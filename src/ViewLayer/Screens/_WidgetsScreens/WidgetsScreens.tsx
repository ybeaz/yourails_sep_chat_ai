import React, { useRef, useEffect, useMemo } from 'react'
import { View } from 'react-native'

import {
  mediaParamsDefault,
  urlParamsDefault,
  withParamsMediaYrl,
  withPropsYrl,
  withStoreStateSliceYrl,
} from '../../../YrlNativeViewLibrary'

import { WidgetsScreensPropsType } from './WidgetsScreensType'
import { styles } from './WidgetsScreensStyle'

import { SectionMappingType } from '../../../@types/SectionMappingType'
import { ProfileType } from '../../../@types/GraphqlTypes'

import { ChatCards } from '../../Components/ChatCards/ChatCards'
import { ChatInput } from '../../Components/ChatInput/ChatInput'
import { ChatSpace } from '../../Components/ChatSpace/ChatSpace'
import { ContentMenuMainColumn } from '../../Components/ContentMenuMainColumn/ContentMenuMainColumn'
import { getSectionsMappingForProfile } from '../../../Shared/getSectionsMappingForProfile'
import { handleEvents as handleEventsProp } from '../../../DataLayer/index.handleEvents'
import { themes } from '../../Styles/themes'
import { TopBarChatCards } from '../../Components/TopBarChatCards/TopBarChatCards'
import { TopBarMainColumn } from '../../Components/TopBarMainColumn/TopBarMainColumn'
import { getSocketOnConversation } from '../../../CommunicationLayer/socketio/getSocketOnConversation'
import { getSocketDisconnected } from '../../../CommunicationLayer/socketio/getSocketDisconnected'
import { getSocketOnMessage } from '../../../CommunicationLayer/socketio/getSocketOnMessage'
import { getSocketOnPending } from '../../../CommunicationLayer/socketio/getSocketOnPending'
import { getProfileByIdProfile } from '../../../Shared/getProfileByIdProfile'

/**
 * @description Component to render
 * @import import { WidgetsScreens, WidgetsScreensPropsType, WidgetsScreensPropsOutType, WidgetsScreensType } 
             from '../Components/WidgetsScreens/WidgetsScreens'
 */
const WidgetsScreensComponents: any = (props: WidgetsScreensPropsType) => {
  const {
    styleProps = { PageChatsWholeScreen: {} },
    mediaParams = mediaParamsDefault,
    urlParams = urlParamsDefault,
    urlParamsSearch,
    handleEvents,
    storeStateSlice,
  } = props
  const { deviceType } = mediaParams
  const { urlParam1, urlParam2, urlParam3 } = urlParams

  console.info('WidgetsScreens [50]', { props })

  const style = styles[deviceType]

  const renderCounter = useRef(0)

  const {
    idProfileActive,
    isLeftColumn,
    isMainColumn,
    isMainColumnBlank,
    modalFrame,
    profiles,
    sectionsMapping,
  } = storeStateSlice

  const { isShow: isShowModalFrame } = modalFrame

  const query = {
    s: urlParamsSearch.get('s'),
    code: urlParamsSearch.get('code'),
  }

  const profileActive: ProfileType = getProfileByIdProfile(
    profiles,
    idProfileActive
  )

  const profileNameChat = profileActive ? profileActive.profileName : undefined

  const sectionsMappingForProfile: SectionMappingType[] =
    getSectionsMappingForProfile(sectionsMapping, profileNameChat)

  const urlParamsMediaIdentifier = JSON.stringify({
    urlParam1,
    urlParam2,
    urlParam3,
    deviceType,
    sectionsMappingForProfile,
    profilesLen: profiles.length,
  })

  useEffect(() => {
    if (renderCounter.current === 0) {
      /** @description Add socket.io listeners **/
      getSocketOnConversation()
      getSocketOnMessage()
      getSocketOnPending()

      /** @description Obtaining a user data, loading profiles, messages, etc. as a first step. **/
      handleEvents.INIT_LOADING({}, { query })

      /** @description Add the 'beforeunload' event listener to gracefully disconnect when reloading the page */
      window.addEventListener('beforeunload', getSocketDisconnected)
    }

    renderCounter.current = renderCounter.current + 1

    /** @description Clean up the event listener when the component unmounts */
    return () => {
      window.removeEventListener('beforeunload', getSocketDisconnected)
    }
  }, [])

  useEffect(() => {
    handleEvents.SET_STORE_SCENARIO(
      {},
      {
        urlParam1,
        urlParam2,
        urlParam3,
        query,
        deviceType,
        sectionsMappingForProfile,
      }
    )
  }, [urlParamsMediaIdentifier])

  const layoutOfRowProps = {
    isLeftColumn,
    isMainColumn,
    styleProps: {
      LayoutOfRow: style.layoutOfRow,
    },
  }

  const propsOut: Record<string, any> = {
    layoutScreenProps: {
      styleProps: {
        LayoutScreen: {},
        layoutNavigationTop: {
          height: sectionsMappingForProfile.length ? '6rem' : '4rem',
        },
        layoutMainContent: {
          top: sectionsMappingForProfile.length ? '6rem' : '4rem',
          bottom: isShowModalFrame ? 0 : '4rem',
        },
        layoutNavigationBottom: { height: '6rem' },
      },
      isActive: profiles.length ? true : false,
    },
    layoutOfRowNavigationTopProps: {
      ...layoutOfRowProps,
      styleProps: {
        LayoutOfRow: {
          ...layoutOfRowProps.styleProps.LayoutOfRow,
        },
        leftColumn: {
          borderStyle: 'solid',
          // borderTopWidth: 1,
          borderRightWidth: isMainColumnBlank ? 1 : 0,
          // borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderColor: themes['themeA'].colors01.borderColor,
        },
        mainColumn: {
          borderStyle: 'solid',
          // borderTopWidth: 1,
          borderRightWidth: 1,
          // borderBottomWidth: 1,
          // borderLeftWidth: 1,
          borderColor: themes['themeA'].colors01.borderColor,
        },
      },
    },
    layoutOfRowMainContentProps: {
      ...layoutOfRowProps,
      styleProps: {
        LayoutOfRow: {
          ...layoutOfRowProps.styleProps.LayoutOfRow,
        },
        leftColumn: {
          borderStyle: 'solid',
          // borderTopWidth: 1,
          // borderRightWidth: 1,
          // borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderColor: themes['themeA'].colors01.borderColor,
        },
        mainColumn: {
          borderStyle: 'solid',
          borderTopWidth:
            !isMainColumnBlank && sectionsMappingForProfile.length ? 1 : 0,
          borderRightWidth: 1,
          // borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderColor: themes['themeA'].colors01.borderColor,
        },
      },
    },
    layoutOfRowNavigationBottomProps: {
      ...layoutOfRowProps,
      styleProps: {
        LayoutOfRow: {
          ...layoutOfRowProps.styleProps.LayoutOfRow,
        },
        leftColumn: {
          borderStyle: 'solid',
          // borderTopWidth: 1,
          // borderRightWidth: 1,
          // borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderColor: themes['themeA'].colors01.borderColor,
        },
        mainColumn: {
          borderStyle: 'solid',
          // borderTopWidth: 1,
          borderRightWidth: 1,
          // borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderColor: themes['themeA'].colors01.borderColor,
        },
      },
    },
    mainColumnContentMenuProps: {
      styleProps: {
        buttonWrapper: {
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: 1,
          borderTopColor: themes['themeA'].colors01.borderColor,
          borderRightColor: themes['themeA'].colors01.borderColor,
          borderBottomColor: themes['themeA'].colors01.borderColor,
          borderLeftColor: themes['themeA'].colors01.borderColor,
        },
      },
    },
    isShowModalFrame,
  }

  const ChatCardsHeader = useMemo(
    () => (
      <View style={[style.leftColumnTopBars]} testID='leftColumnTopBars'>
        <TopBarChatCards />
      </View>
    ),
    []
  )

  const ChatSpaceHeader = (
    <View
      style={[style.ChatSpaceHeader, themes['themeA'].colors03]}
      testID='ChatSpaceHeader'
    >
      {!isMainColumnBlank ? (
        <View
          style={[
            style.mainColumnTopBar,
            {
              borderStyle: 'solid',
              // borderTopWidth: 1,
              // borderRightWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
            },
            themes['themeA'].colors01,
          ]}
          testID='mainColumnTopBar'
        >
          <TopBarMainColumn />
        </View>
      ) : null}

      {!isMainColumnBlank && sectionsMappingForProfile.length ? (
        <View
          style={[style.mainColumnContentMenu, themes['themeA'].colors01]}
          testID='mainColumnContentMenu'
        >
          <ContentMenuMainColumn {...propsOut.mainColumnContentMenuProps} />
        </View>
      ) : null}
    </View>
  )

  const ChatCardsBody = useMemo(
    () => (
      <View
        style={[style.leftColumnChatCardSpace]}
        testID='leftColumnChatCardSpace'
      >
        <ChatCards />
      </View>
    ),
    []
  )

  const ChatSpaceBody = useMemo(() => <ChatSpace />, [])

  const ChatSpaceFooter = useMemo(
    () => (
      <View
        style={[style.chatInput, themes['themeA'].colors03]}
        testID='chatInput'
      >
        <ChatInput />
      </View>
    ),
    []
  )

  return propsOut
}

export const WidgetsScreens = withPropsYrl({
  handleEvents: handleEventsProp,
})(
  withStoreStateSliceYrl(
    [
      'idProfileActive',
      'isLeftColumn',
      'isMainColumn',
      'isMainColumnBlank',
      'modalFrame',
      'profiles',
      'sectionsMapping',
    ],
    withParamsMediaYrl(WidgetsScreensComponents)
  )
)

export type {
  WidgetsScreensPropsType,
  // WidgetsScreensPropsOutType,
  // WidgetsScreensComponentType,
  // WidgetsScreensType,
}