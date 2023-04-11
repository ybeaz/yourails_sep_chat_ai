import React from 'react'
import { View } from 'react-native'

import { InputTextYrl } from '../../../YrlNativeViewLibrary/InputTextYrl/InputTextYrl'
import { IconYrl } from '../../../YrlNativeViewLibrary/IconYrl/IconYrl'
import { ChatInputType } from './ChatInputType'
import { style } from './ChatInputStyle'
import { themes } from '../../Styles/themes'

const ChatInputComponent: ChatInputType = props => {
  const propsOut: Record<string, any> = {
    inputTextYrlProps: {
      onChangeText: (text: string) => {},
      styleProps: {
        InputTextYrl: style.InputTextYrl,
        inputText: {
          ...style.inputText,
          ...themes.themeA.colors01,
          border: 0,
          outlineWidth: 0,
        },
      },
      testID: 'ChatInput_InputTextYrl',
      multiline: true,
      numberOfLines: 4,
      placeholder: 'Message',
      placeholderTextColor: '#a2acb4',
    },
    sendIconYrlProps: {
      library: 'Ionicons',
      name: 'ios-send',
      styleProps: { IconYrl: { cursor: 'pointer' } },
      size: '1.5rem',
      color: themes['themeA'].colors02.color,
      testID: 'TopBarChatCardsComponent_IconYrl_search',
    },
  }

  return (
    <View style={[style.ChatInput]} testID='ChatInput'>
      <View style={[style.inputButton]} testID='ChatInput_inputButton'>
        <InputTextYrl {...propsOut.inputTextYrlProps} />
        <View style={[style.iconYrlWrapper]} testID='iconYrlWrapper'>
          <IconYrl {...propsOut.sendIconYrlProps} />
        </View>
      </View>
    </View>
  )
}

export const ChatInput = React.memo(ChatInputComponent)
