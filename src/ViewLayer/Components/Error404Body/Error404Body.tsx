import React from 'react'
import { View } from 'react-native'

import { Text } from '../../Components/Text/Text'
import { Error404BodyType } from './Error404BodyType'
import { style } from './Error404BodyStyle'

const Error404BodyComponent: Error404BodyType = () => {
  return (
    <View style={style.Error404Body}>
      <View style={style.content}>
        <Text>Oops!</Text>
        <Text>404 Not Found</Text>
        <Text>Sorry, an error has occured, Requested page not found!</Text>
        <View style={style.actions}>
          <Text>Take Me Home</Text>
          <Text>Contact Support</Text>
        </View>
      </View>
    </View>
  )
}

export const Error404Body = React.memo(Error404BodyComponent)
