import React from 'react'
import {Text} from 'react-native'
import {styles} from './styles'
import Touchable from '../../Components/Touchable'

export default class Button extends React.Component {
  static defaultProps = {
    onPress: () => {}
  }
  render () {
    return (
      <Touchable onPress={this.props.onPress} style={[styles.button, this.props.style]}>
        <Text style={[styles.buttonText, this.props.buttonStyle]}>{this.props.buttonName}</Text>
      </Touchable>
    )
  }
}
