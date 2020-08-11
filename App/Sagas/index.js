import {takeLatest, all} from 'redux-saga/effects'

/* ------------- Types ------------- */

import {loginTypes} from '../Redux/LoginRedux'

/* ------------- Sagas ------------- */

import {validateUser, packageList, checkIn, dailyNews} from './LoginSaga'
// registerUser, getLoginData, 
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),
    // takeLatest(StartupTypes.GET_LOGIN_DETAILS_REQUEST, startup),
    // takeLatest(loginTypes.REGISTER_USER_REQUEST, registerUser),
    // takeLatest(loginTypes.GET_LOGIN_DETAILS_REQUEST, getLoginData),
    takeLatest(loginTypes.GET_VALID_USER_REQUEST, validateUser),
    takeLatest(loginTypes.GET_PACKAGE_LIST_REQUEST, packageList),
    takeLatest(loginTypes.GET_CHECK_IN_REQUEST, checkIn),
    takeLatest(loginTypes.GET_DAILY_NEWS_REQUEST, dailyNews)
    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
