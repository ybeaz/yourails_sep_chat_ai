import { StyleSheet } from 'react-native'
import { styleGlobal } from '../../Styles/styleGlobal'

export const style = StyleSheet.create({
  ContentMenuMainColumn: {
    ...styleGlobal.typography,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
})
