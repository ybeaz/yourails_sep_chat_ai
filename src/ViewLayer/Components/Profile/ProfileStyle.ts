import { StyleSheet } from 'react-native'
import { styleGlobal } from '../../Styles/styleGlobal'

export const stylesDefault = StyleSheet.create({
  Profile: {
    ...styleGlobal.typography,
    flex: 1,
    flexDirection: 'column',
    padding: '3rem'.getPx(),
  },
  imageWrapper: {
    alignItems: 'center',
    paddingBottom: '2rem'.getPx(),
  },
  profileItemsWrapper: {},
  qrCodeImageWrapper: {},
  rowView: {
    flexDirection: 'row',
    flex: 1,
    padding: '0.5rem'.getPx(),
  },
  column1: {
    paddingRight: '1rem'.getPx(),
  },
  column2: {
    flex: 1,
  },
  content: {},
  label: {
    fontSize: 13,
    paddingTop: '0.25rem'.getPx(),
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },

  messengerView: { flexDirection: 'row' },
  messengerNameText: {},
  profilenameText: {},
})

const xsDevice = StyleSheet.create({
  ...stylesDefault,
})

const smDevice = StyleSheet.create({
  ...xsDevice,
})

const mdDevice = StyleSheet.create({
  ...xsDevice,
})

const lgDevice = StyleSheet.create({
  ...xsDevice,
})

const xlDevice = StyleSheet.create({
  ...xsDevice,
})

/**
 * @import import { styles } from './TemplateStyles'
 */
export const styles: Record<string, any> = {
  xsDevice: xsDevice,
  smDevice: smDevice,
  mdDevice: mdDevice,
  lgDevice: lgDevice,
  xlDevice: xlDevice,
}
