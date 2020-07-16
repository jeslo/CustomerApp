import React, {PureComponent} from 'react'
import {View, ScrollView, Text} from 'react-native'
import Touchable from '../../Components/Touchable'
import OptionalView from '../../Components/OptionalView'
import {Colors, Fonts} from '../../Themes'
import Modal from 'react-native-modal'
import styles from './styles'

export default class Popup extends PureComponent {
  renderPopupHeading = () => {
    return (
      <Touchable
        onPress={this.props.onBack}
        style={{backgroundColor: Colors.steel, padding: 20, flexDirection: 'row'}}>
        <Text style={{...Fonts.style.description, color: Colors.black, marginRight: 10, flex: 1, fontWeight: 'bold' }}>
          {this.props.title}
        </Text>
        <Text style={{...Fonts.style.description, color: Colors.black, fontWeight:'bold'}}>
          X
        </Text>
      </Touchable>
    )
  }

  render () {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackButtonPress={this.props.onBack}
        onBackdropPress={this.props.onBack}
        // style={styles.bottomModal}
        style={{ justifyContent: 'flex-end', margin: 0,  }}
      >
        <View style={{ backgroundColor: Colors.rbcwhite }}>
          <ScrollView>
            <OptionalView hide={!this.props.title}>
              <this.renderPopupHeading />
            </OptionalView>
            {this.props.children}
          </ScrollView>
        </View>
      </Modal>
    )
  }
}
