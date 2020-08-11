import {put} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation'
import Actions from '../Redux/LoginRedux'
import _ from 'lodash'

const LOGIN_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/AppUserLogin'
const REGISTER_URL =
  'http://crmservice.rbcentre.com/api/CRMMobApp/UserRegistration'
const VALIDATE_USER_URL =
  'http://crmservice.rbcentre.com/api/CRMMobApp/GetValidUser'
const PACKAGE_LIST_URL =
  'http://crmservice.rbcentre.com/api/CRMMobApp/GetPakagesByUser'
const CHECK_IN_URL =
  'http://crmservice.rbcentre.com/api/CRMMobApp/UserCheckInProcess'
const DAILY_NEWS_URL =
  'http://crmservice.rbcentre.com/api/CRMMobApp/GetdailyNewsForCustomer'


export function * validateUser ({params}) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  }
  const result = yield fetch(VALIDATE_USER_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => e)
  if (result.Flag === 1 && _.get(result, 'Result.guId', '')) {
    yield put(Actions.getValidUserSuccess(result.Result))
    yield put(
      Actions.getPackageListRequest({
        ContactId: _.get(result, 'Result.guId', ''),
      }),
    )
    //yield put(NavigationActions.navigate({routeName: 'CheckinScreen'}))
  } 
  else if (result.Flag === 3)
  return yield put(Actions.getValidUserFailure(result.Result))
  else 
  return yield put(Actions.getValidUserFailure(result.Result))
}

export function * packageList ({params}) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  }
  const result = yield fetch(PACKAGE_LIST_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => e)
  if ((result.Flag == 1) || (result.Flag == 4)) {
    yield put(Actions.getPackageListSuccess(result))
  } else {
    yield put(Actions.getPackageListFailure(result))
  }
}
export function * checkIn ({params, index}) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  }
  const result = yield fetch(CHECK_IN_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => e)
  if (result.Flag === 1) yield put(Actions.getCheckInSuccess(result.Result, index))
  else yield put(Actions.getCheckInFailure(result.Result))
}

export function * dailyNews() {
  const postOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(),
  }
  const result = yield fetch(DAILY_NEWS_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => console.tron.log('>>>>>>eeeee, e'))
  if (result.Flag === 1) {
    yield put(Actions.getDailyNewsSuccess(result))
  } 
  else return yield put(Actions.getDailyNewsFailure(result))
}
