import { StyleSheet } from 'react-native'
import { styleGlobal } from '../../Styles/styleGlobal'

export const PortfolioStyle = StyleSheet.create({
  Portfolio: {
    ...styleGlobal.typography,
    flex: 1,
    flexDirection: 'column',
  },
  viewPadding: {
    padding: '3rem',
  },
})
