import React from 'react'
import {TextInput, Text, View} from 'react-native'
import {Colors, Fonts} from '../../Themes'
import OptionalView from '../../Components/OptionalView'
const styles = {
  textInput: {
    borderRadius: 10,
    // borderRadius: 44,
    minHeight: 44,
    marginBottom: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.rbcwhite,
    borderWidth: 1,
    borderColor: Colors.rbcwhite,
    ...Fonts.style.description
  },
  error: {
    ...Fonts.style.small,
    color: Colors.error,
    marginRight: 5,
    textAlign: 'right'
  }
}
export default class InputText extends React.Component {
  onChangeText = text => {
    this.props.onChangeText && this.props.onChangeText(text)
    
  }

  onBlur = text => {
    this.props.onBlur && this.props.onBlur(text)
  }

  render () {
    const border = this.props.error ? { borderColor: 'red' } : {}
    return (
      <View style={{ marginBottom: 5, alignSelf: 'stretch' }}>
        <TextInput
          onChangeText={this.onChangeText}
          placeholder={this.props.placeholder}
          style={[styles.textInput, border, this.props.style]}
          value={this.props.value}
          onBlur={this.onBlur}
          secureTextEntry={this.props.password}

        />
        <OptionalView hide={!this.props.error}>
          <Text style={styles.error}>{this.props.error}</Text>
        </OptionalView>
      </View>
    )
  }
}
