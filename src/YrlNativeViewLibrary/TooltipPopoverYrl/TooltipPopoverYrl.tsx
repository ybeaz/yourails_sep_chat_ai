import React from 'react'
import { ScrollView, View } from 'react-native'
import { mediaParamsDefault } from '../Hooks/withParamsMediaYrl'

import {
  TooltipPopoverYrlPropsType,
  TooltipPopoverYrlPropsOutType,
  TooltipPopoverYrlType,
} from './TooltipPopoverYrlTypes'
import { styles } from './TooltipPopoverYrlStyles'

/**
 * @description Component to render
 * @import import { TooltipPopoverYrl, TooltipPopoverYrlType, TooltipPopoverYrlPropsType, TooltipPopoverYrlPropsOutType } from '../Components/TooltipPopoverYrl/TooltipPopoverYrl'
 * @propsOut 
  TooltipPopoverYrlProps: {
    styleProps: { TooltipPopoverYrl: {}, scrollView: {}, text: {} },
    title: 'string',
    children: 'string | ReactEelement',
    linkHref: 'string',
    iconLibrary: 'string',
    iconName: 'string',
    testID: 'TooltipPopoverYrl',
  }
 */
export const TooltipPopoverYrl: TooltipPopoverYrlType = props => {
  const {
    children,
    testID,
    styleProps = { TooltipPopoverYrl: {} },
    mediaParams = mediaParamsDefault,
  } = props
  const { deviceType } = mediaParams
  const style = styles[deviceType]

  return (
    <View
      style={[style.TooltipPopoverYrl, styleProps.TooltipPopoverYrl]}
      testID={testID ? testID : 'TooltipPopoverYrl'}
    >
      <ScrollView
        style={[style.scrollView, styleProps.scrollView]}
        testID='tooltipPopoverYrlScrollView'
      >
        {children}
      </ScrollView>
    </View>
  )
}

export type {
  TooltipPopoverYrlType,
  TooltipPopoverYrlPropsType,
  TooltipPopoverYrlPropsOutType,
}
