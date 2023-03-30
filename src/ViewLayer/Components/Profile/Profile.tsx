import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { SafeAreaView, View, Text } from 'react-native'

import { ProfileType } from './ProfileType'
import { ProfileStyle as style } from './ProfileStyle'

/**
 * @import import { Profile } from '../Components/Profile/Profile'
 */
const ProfileComponent: ProfileType = props => {
  const { styleProps = { Profile: {} } } = props

  const getContent = (num: number) => {
    const repeat = new Array(num).fill(
      'My contacts are telephone 415-650-9893, email t3531350@yahoo.com'
    )
    return repeat.map((item, index) => (
      <Text key={`repeat=${index}`}>
        My contacts are telephone 415-650-9893, email t3531350@yahoo.com
      </Text>
    ))
  }

  const propsOut = {}

  return (
    <SafeAreaView style={[style.Profile, styleProps.Profile]} testID='Profile'>
      <View style={[style.viewPadding]} testID='viewPadding'>
        {getContent(30)}
      </View>
    </SafeAreaView>
  )
}

export const Profile = React.memo(ProfileComponent)