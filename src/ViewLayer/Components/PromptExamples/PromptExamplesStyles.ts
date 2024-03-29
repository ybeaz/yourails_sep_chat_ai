import { StyleSheet } from 'react-native'
import { styleGlobal } from '../../Styles/styleGlobal'

export const stylesDefault = StyleSheet.create({
  PromptExamples: {
    ...styleGlobal.typography,
    flexDirection: 'column',
  },
  scrollView: {
    marginHorizontal: 10,
    height: 'auto',
    maxHeight: 350,
  },
  contentContainerStyle: {
    alignItems: 'flex-start',
  },
  header: {
    ...styleGlobal.typography,
    paddingTop: '0.5rem'.getPx(),
    paddingBottom: '0.5rem'.getPx(),
  },
  headerText: {
    ...styleGlobal.h4,
    fontWeight: '400',
  },
  promptExampleText: {},
})

const xsDevice = StyleSheet.create({
  ...stylesDefault,
})

const smDevice = StyleSheet.create({
  ...stylesDefault,
})

const mdDevice = StyleSheet.create({
  ...stylesDefault,
})

const lgDevice = StyleSheet.create({
  ...stylesDefault,
})

const xlDevice = StyleSheet.create({
  ...stylesDefault,
})

/**
 * @import import { styles } from './PromptExamplesStyles'
 */
export const styles: Record<string, any> = {
  xsDevice: xsDevice,
  smDevice: smDevice,
  mdDevice: mdDevice,
  lgDevice: lgDevice,
  xlDevice: xlDevice,
}
