import React from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native'
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
import {email, tenNumber, name, empty} from '../../Transforms/ConvertFromKelvin'
// import {email, tenNumber, name} from '../../Transforms'

// Styles
import {styles} from './styles'

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whiteist: ['']
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)

class LaunchScreen extends React.Component {
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
    this.props.updateFirstLevelKey('loginFailed', '')

    this.props.updatePhoneNumber('value', text)
  }

  render () {
    console.tron.log(' this.props.', this.props)
    return (
      <View style={{flex: 1}}>
        <ScrollView>
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

              <OptionalView hide={!this.props.loginFailed}>
                <Text style={styles.errorText}>{this.props.loginFailed}</Text>
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
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  loginFailed: state.login.loginFailed,
  loader: state.login.loader,
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

  setLoginStatus: value => () => dispatch(Actions.setLoginFlag(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
