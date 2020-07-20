import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
//   getLoginDetailsRequest: ['params'],
//   getLoginDetailsSuccess: ['data'],
//   getLoginDetailsFailure: ['data'],

//   registerUserRequest: ['params'],
//   registerUserSuccess: ['data'],
//   registerUserFailure: ['data'],

  getValidUserRequest: ['params'],
  getValidUserSuccess: ['data'],
  getValidUserFailure: ['data'],

  getPackageListRequest: ['params'],
  getPackageListSuccess: ['data'],
  getPackageListFailure: ['data'],

  getCheckInRequest: ['params'],
  getCheckInSuccess: ['data'],
  getCheckInFailure: [],

  updateFirstLevelKey: ['key', 'value'],
//   getUpdateDisplayName: ['key', 'value'],
//   getUpdateUserName: ['key', 'value'],
//   getUpdatePassword: ['key', 'value'],
//   getUpdateEmail: ['key', 'value'],

  getUpdatePhoneNumber: ['key', 'value'],
  setLoginFlag: ['status'],
  setValidUserFlag: ['status'],
  logoutUser: [],
  popupCard: []
})

export const loginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
//   registerDetails: {},
//   loginDetails: {},
  validUserDetails: {},
  packagedetails: {},
  checkinDetails: {},

//   loginFailed: '',
//   registrationFailed: false,
  validationFailed: '',
  packageGetFailed: false,
  validPage: false,
  isLogin: true,
  packageEmpty: false,
  popupFlag: false,
  loader: false,

//   displayName: {
//     value: '',
//     error: '',
//   },
//   userName: {
//     value: '',
//     error: '',
//   },
//   password: {
//     value: '',
//     error: '',
//   },
//   email: {
//     value: '',
//     error: '',
//   },
  phone: {
    value: '',
    error: '',
  },
})

/* ------------- Reducers ------------- */

export const setLoginOrSignupLoader = (state, {data}) =>
  state.merge({
    loader: true
  })
// export const handleLoginSuccess = (state, {data}) =>
//   state.merge({

//     loginFailed: data,
//     loader: false
//   })
// export const getLoginDetailsFailure = (state, {data}) =>
//   state.merge({
//     loginFailed: data,
//     loader: false
//   })

// export const handleRegistrationSuccess = (state, {data}) =>
//   state.merge({
//     loginLoader: false,
//     isLogin: true,
//     loader: false
//   })
// export const registerUserFailure = (state, {data}) =>
//   state.merge({
//     registrationFailed: true,
//     loginFailed: data,
//     isLogin: false,
//     loader: false
//   })

export const handleValidUserSuccess = (state, {data}) =>
  state.merge({
    validUserDetails: data,
    loader: false
  })
export const handleValidUserFailure = (state, {data}) =>
  state.merge({
    packageEmpty: true,
    validationFailed: data,
    validPage: false,
    loader: false
  })

export const handlePackageListSuccess = (state, {data}) =>
  state.merge({
    packagedetails: data,
    validPage:true,
    packageEmpty: false,
    loader: false
  })
export const handlePackageListFailure = (state, {data}) =>
  state.merge({
    packageGetFailed: true,
    validationFailed: data,
    validPage:false,
    packageEmpty: true,
    loader: false
  })

export const handleCheckInSuccess = (state, {data}) =>
  state.merge({
    checkinDetails: data,
    loader: false
  })
export const handleCheckInFailure = (state, {data}) => state.merge({})

// export const handleupdateDisplayName = (state, {key, value}) =>
//   state.merge({
//     displayName: state.displayName.merge({
//       [key]: value,
//       error: key === 'error' ? value : '',
//     }),
//   })
// export const handleupdateUserName = (state, {key, value}) =>
//   state.merge({
//     userName: state.userName.merge({
//       [key]: value,
//       error: key === 'error' ? value : '',
//     }),
//   })
// export const handleupdatePassword = (state, {key, value}) =>
//   state.merge({
//     password: state.password.merge({
//       [key]: value,
//       error: key === 'error' ? value : '',
//     }),
//   })
// export const handleupdateEmail = (state, {key, value}) =>
//   state.merge({
//     email: state.email.merge({
//       [key]: value,
//       error: key === 'error' ? value : '',
//     }),
//   })
export const handleupdatePhone = (state, {key, value}) =>
  state.merge({
    phone: state.phone.merge({
      [key]: value,
      error: key === 'error' ? value : '',
      validationFailed: ''
    }),
  })
export const handleGetLogin = (state, {status}) =>
  state.merge({
    isLogin: status,
    loginFailed: false
  })
export const handlePopup = (state) =>
  state.merge({
    popupCard: true
  })
export const updateFirstLevelKey = (state, { key, value }) =>
  state.merge({
    [key]: value
  })
export const handleLogoutUser = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  //[Types.GET_LOGIN_DETAILS_REQUEST]: setLoginOrSignupLoader,
//   [Types.GET_LOGIN_DETAILS_SUCCESS]: handleLoginSuccess,
//   [Types.GET_LOGIN_DETAILS_FAILURE]: getLoginDetailsFailure,

//   [Types.REGISTER_USER_REQUEST]: setLoginOrSignupLoader,
//   [Types.REGISTER_USER_SUCCESS]: handleRegistrationSuccess,
//   [Types.REGISTER_USER_FAILURE]: registerUserFailure,

  [Types.GET_VALID_USER_REQUEST]: setLoginOrSignupLoader,
  [Types.GET_VALID_USER_SUCCESS]: handleValidUserSuccess,
  [Types.GET_VALID_USER_FAILURE]: handleValidUserFailure,

  [Types.GET_PACKAGE_LIST_REQUEST]: setLoginOrSignupLoader,
  [Types.GET_PACKAGE_LIST_SUCCESS]: handlePackageListSuccess,
  [Types.GET_PACKAGE_LIST_FAILURE]: handlePackageListFailure,

  [Types.GET_CHECK_IN_REQUEST]: setLoginOrSignupLoader,
  [Types.GET_CHECK_IN_SUCCESS]: handleCheckInSuccess,
  [Types.GET_CHECK_IN_FAILURE]: handleCheckInFailure,

//   [Types.GET_UPDATE_DISPLAY_NAME]: handleupdateDisplayName,
//   [Types.GET_UPDATE_USER_NAME]: handleupdateUserName,
//   [Types.GET_UPDATE_PASSWORD]: handleupdatePassword,
//   [Types.GET_UPDATE_EMAIL]: handleupdateEmail,
  [Types.GET_UPDATE_PHONE_NUMBER]: handleupdatePhone,

  [Types.UPDATE_FIRST_LEVEL_KEY]: updateFirstLevelKey,
  [Types.SET_LOGIN_FLAG]: handleGetLogin,
  [Types.LOGOUT_USER]: handleLogoutUser,
  [Types.POPUP_CARD]: handlePopup
})
