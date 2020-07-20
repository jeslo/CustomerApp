import React from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView,SafeAreaView,BackHandler,FlatList} from 'react-native'
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
import { o } from 'ramda'

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

//   fetchSignUp = () => {
//     if (!this.validateSignUp()) return
//     this.props.registerUser({
//       DisplayName: this.props.displayName,
//       UserName: this.props.userName,
//       Phone: this.props.phone,
//       Password: this.props.password,
//       Email: this.props.email,
//     })
//   }

//   validateEmail = () => {
//     if (!this.props.email)
//       return this.props.updateEmailId('error', 'Enter email')
//     if (!email(this.props.email)) {
//       this.props.updateEmailId('error', 'invalid email')
//     }
//   }
  validatePhone = () => {
    if (!this.props.phone)
      return this.props.updatePhoneNumber('error', 'Enter Phone number')
    if (!tenNumber(this.props.phone) === true) {
      this.props.updatePhoneNumber('error', 'invalid phone number')
    }
  }
//   validatePassword = () => {
//     if (!empty(this.props.password)) {
//       this.props.updatePassword('error', 'Password can not be empty')
//     }
//   }
//   validateUsername = () => {
//     if (!this.props.userName)
//       return this.props.updateUserName('error', 'Enter username')
//     if (!name(this.props.userName)) {
//       this.props.updateUserName('error', 'Enter a valid user name')
//     }
//   }

//   validateDisplayName = () => {
//     if (!this.props.displayName) {
//       this.props.updateDisplayName('error', 'Enter display name')
//     }
//   }

//   onChangeDisplayName = text => {
//     this.props.updateFirstLevelKey('loginFailed', '')
//     this.props.updateDisplayName('value', text)
//   }
//   onChangeUserName = text => {
//     this.props.updateFirstLevelKey('loginFailed', '')
//     this.props.updateUserName('value', text)
//   }
//   onChangePassword = text => {
//     this.props.updateFirstLevelKey('loginFailed', '')
//     this.props.updatePassword('value', text)
//   }
//   onChangeEmail = text => {
//     this.props.updateFirstLevelKey('loginFailed', '')
//     this.props.updateEmailId('value', text)
//   }

  onChangePhoneNumber = text => {
    this.props.updateFirstLevelKey('validationFailed', '')

    this.props.updatePhoneNumber('value', text)
  }
  renderFailureCard = () => {
    if (!this.props.packageEmpt) return null
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
      <FlatList style={{
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50
      }}
        
      data={this.props.packageList} renderItem={this.renderItem} />
    )
  }
  renderItem = ({item}) => {
    return (
      <View key={item.productName} style={{backgroundColor: '#e4e4e4'}}>
        {/* <TouchableOpacity
          onPress={() =>
            this.setState({
              show: true,
              item,
            })
          }> */}
          <View style={styles.cellItem}>
            <Text style={styles.title}> {_.get(item, 'productName', '')}</Text>
            <Text style={styles.title}>
              {' '}
              {_.get(item, 'DueAmount', 'No Due')}
            </Text>
            <View 
            style={{
              paddingBottom: 10,
             marginRight: 0,
             alignSelf: 'flex-end'
            }}
            >
            <TextButton style={styles.checkinButton}
            buttonName= 'CHECKIN'>

            </TextButton>
            </View>
          </View>
        {/* </TouchableOpacity> */}
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
            {/* <Image
              source={require('./Images/RBClogo.jpg')}
              style={{
                marginTop: 20,
                height: 100,
                width: 100,
                resizeMode: 'contain',
              }}
            /> */}
            <View style={styles.signUPbox}>
              {/* <OptionalView hide={this.props.isLogin}>
                <InputText
                  onChangeText={this.onChangeDisplayName}
                  placeholder='Enter Display Name'
                  value={this.props.displayName}
                  error={this.props.displayNameError}
                  onBlur={this.validateName}
                />
              </OptionalView>
              <InputText
                onChangeText={this.onChangeUserName}
                // onChangeText={this.onChangeText('userName')}
                placeholder='Enter UserName'
                value={this.props.userName}
                error={this.props.userNameError}
                onBlur={this.validateUsername}
              />
              <InputText
                // onChangeText={this.onChangeText('password')}
                onChangeText={this.onChangePassword}
                placeholder={'Enter Password'}
                value={this.props.password}
                textContentType='password'
                onBlur={this.validatePassword}
                error={this.props.passwordError}
                password
              /> */}
              {/* <OptionalView hide={this.props.isLogin}>
                <InputText
                  // onChangeText={this.onChangeText('email')}
                  onChangeText={this.onChangeEmail}
                  placeholder={'Enter Email_ID'}
                  value={this.props.email}
                  onBlur={this.validateEmail}
                  error={this.props.emailError}
                />
              </OptionalView>
              <OptionalView hide={this.props.isLogin}> */}
                <InputText
                  onChangeText={this.onChangePhoneNumber}
                  placeholder={'Enter PhoneNumber'}
                  onBlur={this.validatePhone}
                  value={this.props.phone}
                  error={this.props.phoneError}
                />
              {/* </OptionalView> */}

              <OptionalView hide={!this.props.validationFailed}>
                <Text style={styles.errorText}>{this.props.validationFailed}</Text>
              </OptionalView>
              <OptionalView hide={!this.props.loader}>
                  <Loader />
                </OptionalView>
              <TextButton
                buttonName={'SUBMIT'}
                onPress={
                   this.fetchLogin
                }>
                
              </TextButton>

              {/* {this.props.isLogin ? (
                <TouchableOpacity onPress={this.props.setLoginStatus(false)}>
                  <Text style={styles.text}>
                    New member click here to Signup
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this.props.setLoginStatus(true)}>
                  <Text style={styles.text}>
                    Haven an account click here to Login
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>
          </View>
          </OptionalView>

          <OptionalView hide={!this.props.validPage}>
          <SafeAreaView>
        <View style={{width: 100, paddingLeft: 10, paddingBottom: 10}}>
          <TextButton buttonName='Logout' onPress={this.logOut} />
        </View>
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
  loader: state.login.loader,
  validationFailed: state.login.validationFailed,
  validPage: state.login.validPage,
  packageEmpty: state.login.packageEmpty,
//   displayName: state.login.displayName.value,
//   displayNameError: state.login.displayName.error,
//   userName: state.login.userName.value,
//   userNameError: state.login.userName.error,
//   password: state.login.password.value,
//   passwordError: state.login.password.error,
//   email: state.login.email.value,
//   emailError: state.login.email.error,
  phone: state.login.phone.value,
  phoneError: state.login.phone.error,
  packageList: _.get(state, 'login.packagedetails.Packagedata.packageItems', []),
  productId: _.get(state.item, 'productId', ''),
  gudid: _.get(state, 'login.packagedetails.Packagedata.guId', ''),
  UserName: _.get(state, 'login.packagedetails.Packagedata.userName', ''),
  Phone: _.get(state, 'login.packagedetails.Packagedata.phone', ''),

  
})

const mapDispatchToProps = dispatch => ({
  //registerUser: params => dispatch(Actions.registerUserRequest(params)),
  validateUser: params => dispatch(Actions.getValidUserRequest(params)),
//   updateDisplayName: (key, value) =>
//     dispatch(Actions.getUpdateDisplayName(key, value)),
//   updateUserName: (key, value) =>
//     dispatch(Actions.getUpdateUserName(key, value)),
//   updatePassword: (key, value) =>
 //   dispatch(Actions.getUpdatePassword(key, value)),
  updatePhoneNumber: (key, value) =>
    dispatch(Actions.getUpdatePhoneNumber(key, value)),
  //updateEmailId: (key, value) => dispatch(Actions.getUpdateEmail(key, value)),
  updateFirstLevelKey: (key, value) =>
    dispatch(Actions.updateFirstLevelKey(key, value)),
    logOut: () => dispatch(Actions.logoutUser()),

  setLoginStatus: value => () => dispatch(Actions.setLoginFlag(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
