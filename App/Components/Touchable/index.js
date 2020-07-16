import React from 'react'
import {TouchableOpacity} from 'react-native'
export default ({children, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  )
}
