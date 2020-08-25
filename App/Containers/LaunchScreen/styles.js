import {StyleSheet} from 'react-native'
import {Colors, Fonts} from '../../Themes'
export const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 200
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
  checkinButton: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: Colors.rbcwhite,
    borderRadius: 51,
    width: 50,
    height:50,
    marginBottom:10
  },
  cellItem: {
      flex: 4,
      flexDirection: 'column',
      padding: 8,
      borderRadius: 15,
      overflow: 'hidden',
      backgroundColor: Colors.rbcblue
      
  },
  celldetails: {
    flex: 4,
    flexDirection: 'row',
    padding: 8,
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: Colors.rbcgreen
    
},
  title: {
    fontWeight: 'bold',
  },
  dailyNews: {
    fontWeight: 'bold',
    marginTop: 5
  },
  dailyNewsBox: {
    padding: 20,
   
  }
})