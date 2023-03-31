import * as React from 'react'
import { SafeAreaView } from 'react-native'
import { TemplateYrlType } from './TemplateYrlType'
import { TemplateYrlStyle as style } from './TemplateYrlStyle'

/**
 * @import import { TemplateYrlYrl } from './ViewLibrary/TemplateYrl/TemplateYrl'
 * @import import { TemplateYrlPropsType } from './ViewLibrary/TemplateYrl/TemplateYrlType'
 * @propsOut 
  templateYrlProps: {
  }
 */
export const TemplateYrl: TemplateYrlType = props => {
  const { styleProps = { TemplateYrl: {} }, testID = 'TemplateYrl' } = props

  return (
    <SafeAreaView
      style={[style.TemplateYrl, styleProps.TemplateYrl]}
      testID={testID}
    ></SafeAreaView>
  )
}