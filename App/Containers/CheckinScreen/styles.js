import {StyleSheet} from 'react-native'
import {Colors} from '../../Themes'
export const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.rbcwhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellItem: {
    backgroundColor: Colors.rbcblue,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 7,
  },
  title: {
    fontSize: 14,
    
  },
  popupTitle: {
    fontWeight: 'bold'
  },
  header_footer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 7,
    backgroundColor: Colors.rbcgreen
  },
  contactRbcText: {
    fontSize: 20,
    textAlign: 'center',
    padding: 20
  },
  button: {
    marginBottom: 20
  }
})
