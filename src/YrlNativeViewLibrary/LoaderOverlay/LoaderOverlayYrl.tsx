import React from 'react'
import { SafeAreaView } from 'react-native'

import { LoaderOverlayYrlStyle as style } from './LoaderOverlayYrlStyle'
import { LoaderOverlayType } from './LoaderOverlayYrlType'

/**
 * @import import { LoaderOverlayYrl } from './ViewLibrary/LoaderOverlay/LoaderOverlay'
 * @import import { LoaderOverlayPropsType } from './ViewLibrary/LoaderOverlay/LoaderOverlayType'
 * @propsOut 
  loaderOverlayYrl: {
    propsStyle: { LoaderOverlay: {}, spinner: {} },
    isLoaderOverlayVisible: false,
    testID: 'LoaderOverlayYrl',
  }
 */
const LoaderOverlayYrl: LoaderOverlayType = props => {
  const {
    propsStyle = { LoaderOverlay: {}, spinner: {} },
    isLoaderOverlayVisible,
    testID = 'LoaderOverlayYrl',
  } = props

  return (
    <SafeAreaView
      style={[style.LoaderOverlay, propsStyle.LoaderOverlay]}
      testID={testID}
    >
      <SafeAreaView
        style={[style.spinner, propsStyle.spinner]}
        testID={`${testID}_View`}
      ></SafeAreaView>
    </SafeAreaView>
  )
}

export default LoaderOverlayYrl