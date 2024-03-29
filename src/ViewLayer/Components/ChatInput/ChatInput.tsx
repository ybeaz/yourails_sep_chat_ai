import React, { useState } from 'react'
import { View } from 'react-native'
import '../../Styles/styleGlobal'

import {
  ButtonYrl,
  IconYrl,
  withStoreStateSliceYrl,
  InputTextYrl,
  withPropsYrl,
  mediaParamsDefault,
  withParamsMediaYrl,
  TooltipYrl,
} from '../../../YrlNativeViewLibrary'
import {
  ChatInputType,
  ChatInputPropsOutM1Type,
  ChatInputPropsOutType,
} from './ChatInputType'
import { Text } from '../Text/Text'
import { PromptExamples } from '../PromptExamples/PromptExamples'
import { styles } from './ChatInputStyle'
import { themes } from '../../Styles/themes'
import { handleEvents as handleEventsProp } from '../../../DataLayer/index.handleEvents'
import { getProfileByIdProfile } from '../../../Shared/getProfileByIdProfile'

const ChatInputComponent: ChatInputType = props => {
  const {
    handleEvents,
    storeStateSlice,
    mediaParams = mediaParamsDefault,
  } = props

  const {
    profiles,
    profileActiveID,
    inputChat,
    isMainColumnBlank,
    modalFrame,
  } = storeStateSlice
  const { isShow: isShowModalFrame } = modalFrame

  const { deviceType, height, width } = mediaParams
  const style = styles[deviceType]

  const [promptExamplesHeightState, setPromptExamplesHeightState] = useState(32)
  const [helpHeightState, setHelpHeightState] = useState(32)
  const [inputTextYrlHeightState, setInputTextYrlHeightState] = useState(32)
  const [isVisiblePromptExamplesState, setIsVisiblePromptExamplesState] =
    useState(false)
  const [isVisibleHelpState, setIsVisibleHelpsState] = useState(false)

  const onPromptExampleHeightChange = (height: number): void => {
    setPromptExamplesHeightState(height)
  }

  const onHelpHeightChange = (height: number): void => {
    setHelpHeightState(height)
  }

  const onInputTextYrlHeightChange = (height: number): void => {
    setInputTextYrlHeightState(height)
  }

  const onPromptExampleClick = (): void => {
    setIsVisiblePromptExamplesState(false)
  }

  const profileActive = getProfileByIdProfile(profiles, profileActiveID)
  const promptExamples = profileActive?.promptExamples || []
  const helpText = profileActive?.help

  const propsOutM1: ChatInputPropsOutM1Type = {
    tooltipTitleWrapperProps: {
      style: [style.tooltipTitleWrapper],
      testID: 'tooltipTitleWrapper',
    },
    tooltipPopoverPromptExamplesIconProps: {
      library: 'Ionicons',
      name: 'pencil-outline',
      styleProps: {
        IconYrl: {
          cursor: 'pointer',
          paddingRight: '0.25rem'.getPx(),
        },
      },
      size: 16,
      color: themes['themeB'].color10,
      testID: 'tooltip_IconYrl',
    },
    tooltipPopoverHelpIconProps: {
      library: 'Ionicons',
      name: 'help',
      styleProps: {
        IconYrl: {
          cursor: 'pointer',
          paddingRight: '0.25rem'.getPx(),
        },
      },
      size: 16,
      color: themes['themeB'].color10,
      testID: 'tooltip_IconYrl',
    },
    promptExamplesProps: {
      styleProps: {},
      promptExamples,
      onHeightChange: onPromptExampleHeightChange,
      onPromptExampleClick,
      profileActiveID,
    },
    helpTooltipsTextProps: {
      styleProps: {
        Text: { ...style.helpTooltipsText, color: themes['themeB'].color01 },
      },
      onHeightChange: onHelpHeightChange,
      testID: 'helpTooltipsText',
    },
  }

  const tooltipTitlePromptExamples = promptExamples.length ? (
    <View {...propsOutM1.tooltipTitleWrapperProps}>
      <IconYrl {...propsOutM1.tooltipPopoverPromptExamplesIconProps} />
    </View>
  ) : null

  const tooltipTitleHelp = helpText ? (
    <View {...propsOutM1.tooltipTitleWrapperProps}>
      <IconYrl {...propsOutM1.tooltipPopoverHelpIconProps} />
    </View>
  ) : null

  const promptExamplesTooltipContainerStyleTop: number =
    height -
    70 -
    inputTextYrlHeightState -
    (promptExamplesHeightState < 350 ? promptExamplesHeightState : 350)

  let helpTooltipContainerStyleTop: number =
    height -
    70 -
    inputTextYrlHeightState -
    (helpHeightState < 350 ? helpHeightState : 350)

  let inputTextWidth = width * 0.5
  if (deviceType === 'lgDevice') inputTextWidth = width * 0.5
  else if (deviceType === 'mdDevice') inputTextWidth = width * 0.6
  else if (deviceType === 'smDevice' || deviceType === 'xsDevice')
    inputTextWidth = width * 0.8

  const propsOut: ChatInputPropsOutType = {
    inputTextYrlProps: {
      onChangeText: (text: string) =>
        handleEvents.ON_CHANGE_INPUT_CHAT({}, { profileActiveID, text }),
      onSubmitEditing: () => {
        handleEvents?.CLICK_ON_SEND_MESSAGE({}, {})
      },
      onHeightChange: onInputTextYrlHeightChange,
      styleProps: {
        InputTextYrl: {
          ...style.InputTextYrl,
          borderColor: themes.themeB.color08,
          width: inputTextWidth,
        },
        inputText: {
          ...style.inputText,
          ...themes.themeA.colors01,
          minWidth: inputTextWidth,
          minHeight:
            '4rem'.getPx() -
            '0.5rem'.getPx() /* Height of the the imput field */,
          maxHeight: '100%',
        },
        inputTextResize: { ...style.inputTextResize },
      },
      testID: 'ChatInput_InputTextYrl',
      multiline: true,
      numberOfLines: 3,
      placeholder: 'Message',
      placeholderTextColor: themes['themeB'].color10,
      value: (profileActiveID && inputChat[profileActiveID]) || '',
      maxHeight: '6rem'.getPx() - '0.5rem'.getPx(),
    },
    sendButtonYrlProps: {
      styleProps: { ButtonYrl: {}, title: {} },
      titleText: '',
      testID: 'ButtonYrl',
      disabled: false,
      onPress: () => handleEvents.CLICK_ON_SEND_MESSAGE({}, { profileActive }),
    },
    sendIconYrlProps: {
      library: 'Ionicons',
      name: 'send',
      styleProps: { IconYrl: { cursor: 'pointer' } },
      size: 24,
      color: themes['themeA'].colors02.color,
      testID: 'chatInput_IconYrl',
    },
    buttonCopyToClipboardProps: {
      styleProps: { ButtonYrl: {}, title: {} },
      titleText: undefined,
      testID: 'pasteThisButtonYrl',
      disabled: false,
      onPress: async () => {
        const text = (profileActiveID && inputChat[profileActiveID]) || ''
        navigator.clipboard.writeText(text)
      },
      iconProps: {
        library: 'Ionicons',
        name: 'copy-outline',
        styleProps: { IconYrl: {} },
        size: 18,
        color: themes['themeB'].color10,
        testID: 'copyThisIconYrl',
      },
    },
    buttonPasteFromClipboardProps: {
      styleProps: { ButtonYrl: {}, title: {} },
      titleText: undefined,
      testID: 'pasteThisButtonYrl',
      disabled: false,
      onPress: async () => {
        const clipboardText = await navigator.clipboard.readText()
        handleEvents.CLICK_ON_PASTE_FROM_CLOPBOARD(
          {},
          { profileActiveID, text: clipboardText }
        )
      },
      iconProps: {
        library: 'Ionicons',
        name: 'arrow-down-circle-outline',
        styleProps: { IconYrl: {} },
        size: 20,
        color: themes['themeB'].color10,
        testID: 'copyThisIconYrl',
      },
    },
    buttonClearInputProps: {
      styleProps: { ButtonYrl: {}, title: {} },
      titleText: undefined,
      testID: 'pasteThisButtonYrl',
      disabled: false,
      onPress: async () => {
        handleEvents.CLICK_ON_PASTE_FROM_CLOPBOARD(
          {},
          { profileActiveID, text: '' }
        )
      },
      iconProps: {
        library: 'Ionicons',
        name: 'close-outline',
        styleProps: { IconYrl: {} },
        size: 22,
        color: themes['themeB'].color10,
        testID: 'copyThisIconYrl',
      },
    },
    tooltipPromptExamplesProps: {
      backgroundColor: themes['themeA'].colors09.backgroundColor,
      children: <PromptExamples {...propsOutM1.promptExamplesProps} />,
      styleProps: {
        TooltipYrl: style.tooltip_TooltipYrl,
        iconTextWrapper: style.tooltip_iconTextWrapper,
        titleText: [style.tooltip_titleText],
        containerStyle: {
          ...style.tooltip_container,
          top: promptExamplesTooltipContainerStyleTop,
          alignSelf: 'center',
        },
        TooltipPopoverYrl: style.tooltip_tooltipPopover,
      },
      setIsVisibleProp: setIsVisiblePromptExamplesState,
      isVisibleProp: isVisiblePromptExamplesState,
      testID: `tooltipPromptExample`,
      titleText: tooltipTitlePromptExamples,
    },
    tooltipHelpProps: {
      backgroundColor: themes['themeA'].colors09.backgroundColor,
      children: <Text {...propsOutM1.helpTooltipsTextProps}>{helpText}</Text>,
      styleProps: {
        TooltipYrl: style.tooltip_TooltipYrl,
        iconTextWrapper: style.tooltip_iconTextWrapper,
        titleText: [style.tooltip_titleText],
        containerStyle: {
          ...style.tooltip_container,
          top: helpTooltipContainerStyleTop,
          alignSelf: 'center',
        },
        TooltipPopoverYrl: style.tooltip_tooltipPopover,
      },
      setIsVisibleProp: setIsVisibleHelpsState,
      isVisibleProp:
        helpText && isVisibleHelpState ? isVisibleHelpState : false,
      testID: `tooltipHelp`,
      titleText: tooltipTitleHelp,
    },
    buttonSmallSendProps: {
      styleProps: { ButtonYrl: {}, title: {} },
      titleText: undefined,
      testID: 'buttonSmallSend',
      disabled: false,
      onPress: async () =>
        handleEvents.CLICK_ON_SEND_MESSAGE({}, { profileActive }),
      iconProps: {
        library: 'Ionicons',
        name: 'send-outline',
        styleProps: { IconYrl: {} },
        size: 16,
        color: themes['themeB'].color10,
        testID: 'iconSmallSendProps',
      },
    },
    buttonIconYrlWrapperProps: {
      style: {
        ...style.buttonIconYrlWrapper,
        top: inputTextYrlHeightState / 2 - '0.75rem'.getPx(),
      },
      testID: 'buttonIconYrlWrapper',
    },
  }

  return (
    <>
      {!isMainColumnBlank && isShowModalFrame === false ? (
        <View style={[style.ChatInput]} testID='ChatInput'>
          <View style={[style.tooltipsWrapper]} testID='tooltipsWrapper'>
            <ButtonYrl {...propsOut.buttonCopyToClipboardProps} />
            <ButtonYrl {...propsOut.buttonPasteFromClipboardProps} />
            <ButtonYrl {...propsOut.buttonClearInputProps} />
            <TooltipYrl {...propsOut.tooltipPromptExamplesProps} />
            <TooltipYrl {...propsOut.tooltipHelpProps} />
            <ButtonYrl {...propsOut.buttonSmallSendProps} />
          </View>
          <View style={[style.inputButton]} testID='inputButton'>
            <InputTextYrl {...propsOut.inputTextYrlProps} />
            <View {...propsOut.buttonIconYrlWrapperProps}>
              <ButtonYrl {...propsOut.sendButtonYrlProps}>
                <IconYrl {...propsOut.sendIconYrlProps} />
              </ButtonYrl>
            </View>
          </View>
        </View>
      ) : null}
    </>
  )
}

export const ChatInput = withPropsYrl({ handleEvents: handleEventsProp })(
  withStoreStateSliceYrl(
    [
      'profiles',
      'profileActiveID',
      'inputChat',
      'isMainColumnBlank',
      'modalFrame',
    ],
    withParamsMediaYrl(React.memo(ChatInputComponent))
  )
)
