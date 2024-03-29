import React from 'react'
import { View, Pressable } from 'react-native'

import {
  withParamsMediaYrl,
  mediaParamsDefault,
  withPropsYrl,
} from '../../../YrlNativeViewLibrary'
import { ChatCardType } from './ChatCardType'
import { style } from './ChatCardStyle'
import { themes } from '../../Styles/themes'
import { NameStatus } from '../NameStatus/NameStatus'
import { AvatarPlusInfo } from '../AvatarPlusInfo/AvatarPlusInfo'
import { handleEvents as handleEventsProp } from '../../../DataLayer/index.handleEvents'

/**
 * @import import { ChatCard } from '../Components/ChatCard/ChatCard'
 */
const ChatCardComponent: ChatCardType = props => {
  const {
    profile,
    styleProps = { ChatCard: {} },
    isActive,
    handleEvents,
    mediaParams: { deviceType } = mediaParamsDefault,
    urlParam1,
    urlParam2,
    query,
    platformOS,
  } = props
  const { profileID, profileName } = profile

  const colorStyle = isActive ? themes['themeA'].colors07 : {}

  const propsOut: Record<string, any> = {
    avatarPlusInfoProps: {
      styleProps: {},
      profile,
      onPress: () => {
        if (platformOS === 'web')
          handleEvents.CLICK_TOGGLE_SIDEBAR_MAIN({}, { platformOS, deviceType })

        handleEvents.CLICK_ON_USER_CHAT_CARD(
          {},
          { profileID, profileName, urlParam1, urlParam2, query, platformOS }
        )
      },
    },
    nameStatusProps: {
      styleProps: {
        NameStatus: {},
        viewStyle: colorStyle,
      },
      profile,
      status: 'last seen recently',
    },
    pressableProps: {
      onHoverIn: (event: MouseEvent) => {
        // TODO Implement popup TooltipYrl with information about the profile
        // https://reactnative.dev/docs/pressable
        // console.info('ChatCard [55]', 'onHoverIn', {
        //   eventTarget: event.target,
        //   profileID,
        //   profileName,
        // })
      },
      onHoverOut: (event: MouseEvent) => {
        // TODO Implement popup TooltipYrl with information about the profile
        // https://reactnative.dev/docs/pressable
        // console.info('ChatCard [56]', 'onHoverOut', {
        //   eventTarget: event.target,
        //   profileID,
        //   profileName,
        // })
      },
    },
  }

  return (
    <Pressable {...propsOut.pressableProps}>
      <View
        style={[style.ChatCard, styleProps.ChatCard, colorStyle]}
        testID='ChatCard'
      >
        <AvatarPlusInfo {...propsOut.avatarPlusInfoProps}>
          <NameStatus {...propsOut.nameStatusProps} />
        </AvatarPlusInfo>
      </View>
    </Pressable>
  )
}

export const ChatCard = withPropsYrl({ handleEvents: handleEventsProp })(
  withParamsMediaYrl(React.memo(ChatCardComponent))
)
