import React from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  BackHandler,
  FlatList,
} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../../Redux/LoginRedux'
// import {createStore} from 'redux'
// import AsyncStorage from '@react-native-community/async-storage'
// import {persiStore,persistReducer} from 'redux-persist'
// import {createLogger} from 'redux-logger'
import TextButton from '../../Components/Button/index'
import InputText from '../../Components/InputText'
import Loader from '../../Components/Loader'
import OptionalView from '../../Components/OptionalView'
import {tenNumber} from '../../Transforms/ConvertFromKelvin'
import _ from 'lodash'
import {styles} from './styles'
import Moment from 'moment'
console.disableYellowBox = true

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whiteist: ['']
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)

class LaunchScreen extends React.Component {
  state = {
    show: false,
    item: {},
    newsitem: {},
  }
  onBackPress = () => {
    return true
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    this.props.dailyNews()
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  logOut = () => {
    this.props.navigation.goBack()
    this.props.logOut()
  }
  fetchLogin = () => {
    this.props.validateUser({
      phone: this.props.phone,
    })
  }

  //   validateSignUp = () => {
  //     this.validateEmail()
  //     this.validatePhone()
  //     this.validatePassword()
  //     this.validateUsername()
  //     this.validateDisplayName()
  //     return (
  //       this.props.displayName &&
  //       this.props.userName &&
  //       this.props.phone &&
  //       this.props.password &&
  //       this.props.email
  //     )
  //   }

  validatePhone = () => {
    if (!this.props.phone)
      return this.props.updatePhoneNumber('error', 'Enter Phone number')
    if (!tenNumber(this.props.phone) === true) {
      this.props.updatePhoneNumber('error', 'invalid phone number')
    }
  }

  onChangePhoneNumber = text => {
    this.props.updateFirstLevelKey('validationFailed', '')

    this.props.updatePhoneNumber('value', text)
  }
  renderFailureCard = () => {
    if (this.props.packageGetFailed == 1) return null
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
  renderPackaageList = () => {
    if (this.props.packageEmpty) return null
    return (
      <FlatList
        style={{
          paddingLeft: 10,
          paddingRight: 10,
        }}
        ItemSeparatorComponent={() => <View style={{margin: 10}} />}
        data={this.props.packageList}
        renderItem={this.renderItem}
      />
    )
  }
  CheckinLoader = () => {
    return (
      <OptionalView hide={!this.props.loader}>
        <Loader />
      </OptionalView>
    )
  }

  renderItem = ({item, index}) => {
    var validitydate = Moment(item.validityDate).format('MMM Do YYYY')
    var lastcheckin = Moment(item.lastCheckIn).format('MMM Do YYYY')
    if (validitydate === 'Invalid date') validitydate = ''
    if (lastcheckin === 'Invalid date') lastcheckin = 'Not yet checked in'

    return (
      <View key={item.productName}>
        <View style={styles.cellItem}>
          <View>
            <Text style={styles.title}>{_.get(item, 'productName', '')}</Text>
            <TextButton
              style={styles.checkinButton}
              //buttonName={_.get(item.checkinDetailsFlag, false) ? '✅' : '➤'}
              buttonName={item.checkinDetailsFlag ? '✅' : '➤'}
              onPress={this.props.checkInUser(
                {
                  UserId: this.props.gudid,
                  UserName: this.props.UserName,
                  ProductId: _.get(item, 'productId', ''),
                  ProductName: _.get(item, 'productName', ''),
                  DuesAmount: _.get(item, 'DueAmount', ''),
                  Phone: this.props.Phone,
                },
                index,
              )}></TextButton>

            <View style={{flexDirection: 'row'}}>
              <Text>
                ValidUpto
                <Text style={{marginLeft: 100}}>
                  {' '}
                  {'\t\t\t\t Last Chekc In'}
                </Text>
              </Text>
            </View>

            <Text style={styles.title}>
              {validitydate} {'\t\t\t'}
              {lastcheckin}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  render () {
    console.tron.log(' this.props.', this.props)
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <OptionalView hide={this.props.validPage}>
            <View style={styles.conatiner}>
              <Image
                source={require('./Images/RBClogo.png')}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'contain',
                }}
              />
              <View style={styles.signUPbox}>
                <InputText
                  onChangeText={this.onChangePhoneNumber}
                  placeholder={'Enter PhoneNumber'}
                  onBlur={this.validatePhone}
                  value={this.props.phone}
                  error={this.props.phoneError}
                  keyboardType
                />
                <OptionalView hide={!this.props.validationFailed}>
                  <Text style={styles.errorText}>
                    {this.props.validationFailed}
                  </Text>
                </OptionalView>
                <OptionalView hide={!this.props.loader}>
                  <Loader />
                </OptionalView>
                <TextButton
                  buttonName={'SUBMIT'}
                  onPress={this.fetchLogin}></TextButton>
              </View>
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
                  <Image
                    source={require('./Images/bell.png')}
                    style={{
                      height: 20,
                      width: 20,
                      resizeMode: 'contain',
                      marginRight: 5,
                    }}
                  />
                  <Text>Daily Updates</Text>
                </View>
                <OptionalView hide={!this.props.dailyNewsDataFailed.result}>
                  <Text style={styles.errorText}>
                    {this.props.dailyNewsDataFailed.result}
                  </Text>
                </OptionalView>
                <OptionalView hide={!this.props.dailyNewsData.result}>
                  <ul>
                    {this.props.dailyNewsData.map(d => (
                      <li key={d.news}>{d.news}</li>
                    ))}
                  </ul>
                </OptionalView>
              </View>
            </View>
          </OptionalView>

          <OptionalView hide={!this.props.validPage}>
            <SafeAreaView>
              <View
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  paddingTop: 10,
                  flex: 1,
                  flexDirection: 'row-reverse',
                }}>
                <TextButton
                  buttonName='Logout'
                  onPress={this.logOut}></TextButton>
                <Text
                  style={{
                    paddingTop: 15,
                    paddingLeft: 15,
                    fontWeight: 'bold',
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  Welcome &nbsp;
                  {this.props.UserName}
                </Text>
              </View>

              <this.CheckinLoader />
              <this.renderFailureCard />
              <this.renderPackaageList />
            </SafeAreaView>
          </OptionalView>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  loginFailed: state.login.loginFailed,
  packageGetFailed: state.login.packagedetails.Flag,
  loader: state.login.loader,
  validationFailed: state.login.validationFailed,
  validPage: state.login.validPage,
  packageEmpty: state.login.packageEmpty,
  checkinDetails: state.login.checkinDetails,
  dailyNewsDataFailed: state.login.dailyNewsFailed,
  dailyNewsData: _.get(state, 'login.dailyNews.result', []),

  phone: state.login.phone.value,
  phoneError: state.login.phone.error,
  packageList: _.get(
    state,
    'login.packagedetails.Packagedata.packageItems',
    [],
  ),

  gudid: _.get(state, 'login.packagedetails.Packagedata.guId', ''),
  UserName: _.get(state, 'login.packagedetails.Packagedata.userName', ''),
  productId: _.get(state, 'login.packagedetails.Packagedata.productId', ''),
  ProductName: _.get(state, 'login.packagedetails.Packagedata.productName', ''),
  DuesAmount: _.get(state, 'login.packagedetails.Packagedata.DueAmount', ''),
  Phone: _.get(state, 'login.packagedetails.Packagedata.phone', ''),
})

const mapDispatchToProps = dispatch => ({
  validateUser: params => dispatch(Actions.getValidUserRequest(params)),
  updatePhoneNumber: (key, value) =>
    dispatch(Actions.getUpdatePhoneNumber(key, value)),
  updateFirstLevelKey: (key, value) =>
    dispatch(Actions.updateFirstLevelKey(key, value)),
  logOut: () => dispatch(Actions.logoutUser()),
  checkInUser: (params, index) => () =>
    dispatch(Actions.getCheckInRequest(params, index)),
  setLoginStatus: value => () => dispatch(Actions.setLoginFlag(value)),

  dailyNews: () => dispatch(Actions.getDailyNewsRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
