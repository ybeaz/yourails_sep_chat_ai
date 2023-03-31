import { StyleSheet } from 'react-native'
import { styleGlobal } from '../../Styles/styleGlobal'

export const ControlledTooltipStyle = StyleSheet.create({
  ControlledTooltip: {
    ...styleGlobal.typography,
    flexDirection: 'column',
  },
  viewPadding: {
    padding: '1rem',
  },
})