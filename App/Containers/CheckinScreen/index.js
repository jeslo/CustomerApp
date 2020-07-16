import React from 'react'
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  BackHandler
} from 'react-native'
import _ from 'lodash'
import {styles} from './styles'
import {connect} from 'react-redux'
import Actions from '../../Redux/LoginRedux'
import TextButton from '../../Components/Button'
import Popup from '../../Components/Popup'

class CheckinScreen extends React.Component {
  state = {
    show: false,
    item: {},
  }

  onBackPress = () => {
    return true
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  logOut = () => {
    this.props.navigation.goBack()
    this.props.logOut()
  }
  poupUp = () => {
    this.props.Popup()
  }

  renderItem = ({item}) => {
    return (
      <View key={item.productName} style={{backgroundColor: '#e4e4e4'}}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              show: true,
              item,
            })
          }>
          <View style={styles.cellItem}>
            <Text style={styles.title}> {_.get(item, 'productName', '')}</Text>
            <Text style={styles.title}>
              {' '}
              {_.get(item, 'DueAmount', 'No Due')}
            </Text>
          </View>
          <View style={{backgroundColor: 'red', flex: 1}} />
        </TouchableOpacity>
      </View>
    )
  }
  renderFailureCard = () => {
    if (!this.props.packageEmpty) return null
    return (
      <View
        style={{
          backgroundColor: 'orange',
          borderRadius: 10,
          alignSelf: 'center',
          paddingVertical: 30,
          paddingHorizontal: 20,
          margin: 20,
        }}>
        <Text style={styles.contactRbcText}>
          Hi please contact RBC team to subscribe your packages
        </Text>
      </View>
    )
  }

  renderPopup = ({item}) => {
    return (
      <Popup
        title={_.get(this.state.item, 'productName', '')}
        isVisible={this.state.show}
        onBack={() => this.setState({show: false})}>
        <View style={{padding: 20, justifyContent: 'center'}}>
          <Text style={{flex: 1, textAlign: 'center', margin: 20}}>
            {_.get(this.state, 'item.DueAmount', '') ? _.get(this.state, 'item.DueAmount', '') : 'No Dues' }
          </Text>
          <TextButton
            buttonName='CheckIn'
            onPress={this.props.checkInUser({
              UserId: this.props.gudid,
              UserName: this.props.UserName,
              ProductId: _.get(this.state.item, 'productId', ''),
              packageName: _.get(this.state.item, 'productName', ''),
              dueAmount: _.get(this.state.item, 'DueAmount', ''),
              Phone: this.props.Phone,
            })}
            style={styles.button}
          />
        </View>
      </Popup>
    )
  }

  renderPackaageList = () => {
    if (this.props.packageEmpty) return null
    return (
      <FlatList data={this.props.packageList} renderItem={this.renderItem} />
    )
  }
  render () {
    return (
      <SafeAreaView>
        <View style={{width: 100, paddingLeft: 10, paddingBottom: 10}}>
          <TextButton buttonName='Logout' onPress={this.logOut} />
        </View>
        <this.renderFailureCard />
        <this.renderPackaageList />
        <this.renderPopup />
      </SafeAreaView>
    )
  }
}
const mapStateToProps = state => ({
  packageEmpty: state.login.packageEmpty,

  packageList: _.get(state, 'login.packagedetails.Packagedata.packageItems', [
    1,
    2,
  ]),
  gudid: _.get(state, 'login.packagedetails.Packagedata.guId', ''),
  UserName: _.get(state, 'login.packagedetails.Packagedata.userName', ''),
  Phone: _.get(state, 'login.packagedetails.Packagedata.phone', ''),
})
const mapDispatchToProps = dispatch => ({
  checkInUser: params => () => dispatch(Actions.getCheckInRequest(params)),
  logOut: () => dispatch(Actions.logoutUser()),
  popup: () => dispatch(Actions.popupCard()),
})
export default connect(mapStateToProps, mapDispatchToProps)(CheckinScreen)
