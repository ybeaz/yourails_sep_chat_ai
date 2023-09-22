import { StyleSheet } from 'react-native'

export const ModalFrameYrlStyle = StyleSheet.create({
  ModalFrameYrl: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    top: 0,
    width: '100%',
  },
  imageBackground: {
    backgroundColor: 'blue',
    // tintColor: 'rgba(255,255,255,0.95)',
    opacity: 0.5,
  },
  buttonBackWrapper: {
    position: 'absolute',
    top: '0.5rem',
    left: 16,
  },
  buttonCloseWrapper: {
    position: 'absolute',
    top: '0.5rem',
    right: 16,
  },
  content: {
    margin: '3rem',
    borderRadius: 3,
  },
  hidden: {
    opacity: 0,
    height: 0,
    width: 0,
    flex: 0,
  },
})
