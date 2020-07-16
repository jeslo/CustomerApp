
import React from 'react'
import {View, ActivityIndicator} from 'react-native'

export default class Loader extends React.Component {
  render () {
    return (
      <View>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
}
