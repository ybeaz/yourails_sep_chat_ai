import { StyleSheet } from 'react-native'

const themeA = StyleSheet.create({
  colors01: {
    // color black, backgroundColor white, borderColor light-grey
    color: 'rgba(25, 35, 50, 0.9)',
    backgroundColor: 'rgba(252, 253, 252, 1)',
    borderColor: 'rgba(223, 225, 229, 1)',
  },
  colors02: {
    // color blue, backgroundColor white
    color: '#3390ec',
    backgroundColor: 'rgba(252, 253, 252, 1)',
  },
  colors03: {
    // color black, backgroundColor grey, borderColor light-grey
    color: 'rgba(25, 35, 50, 0.9)',
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderColor: 'rgba(223, 225, 229, 1)',
  },
  colors05: {
    // color grey, backgroundColor white
    color: '#707579',
    backgroundColor: 'rgba(252, 253, 252, 1)',
  },
  colors06: {
    borderColor: 'rgba(252, 253, 252, 1)',
  },
  colors07: {
    // color white, backgroundColor blue
    color: 'rgba(252, 253, 252, 1)',
    backgroundColor: '#3390ec',
  },
  colors08: {
    // color dark-blue, backgroundColor white
    color: 'rgba(63, 81, 181, 1)',
    backgroundColor: 'rgba(230, 235, 238, 1',
  },
  colors09: {
    // color black, backgroundColor whitesmoke
    color: 'rgba(63, 81, 181, 1)',
    backgroundColor: 'rgba(230, 235, 238, 1)',
  },
})

/**
 * @import import { themes } from '../Styles/themes'
 */
export const themes = {
  themeA,
}
