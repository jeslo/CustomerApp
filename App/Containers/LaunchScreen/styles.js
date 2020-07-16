import {StyleSheet} from 'react-native'
import {Colors, Fonts} from '../../Themes'
export const styles = StyleSheet.create({
  conatiner: {
    // flex: 1,
    // padding: 20,
    backgroundColor: '#e4e4e4',
    alignItems: 'center',
    marginBottom: 0,
  },
  scroll: {
    backgroundColor: Colors.cloud,
    flex: 1,
  },
  text: {
    paddingTop: 20,
    ...Fonts.style.normal,
    color: Colors.rbcwhite,
  },
  signUPbox: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.rbcblue,
    padding: 30,
    borderRadius: 20,
    alignSelf: 'stretch',
    marginBottom: 20
  },
  buttonText: {
    ...Fonts.style.normal,
    color: Colors.buttonColor,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.rbcgreen,
    borderRadius: 10,
    height: 44,
    borderColor: Colors.charcoal,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
  },
  errorText: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#e83a30',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    borderRadius: 10,
    textAlign: 'center',
    overflow: 'hidden'
  },
})
