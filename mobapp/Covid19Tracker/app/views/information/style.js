import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

const style = StyleSheet.create({

  topSafeAreaView: {
    flex: 0,
    backgroundColor: Colors.PICKLED_BLUEWOOD
  },

  safeAreaView: {
    flex: 1,
    paddingTop: 0,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR
  },

  header: {
    height: '25%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: Colors.PICKLED_BLUEWOOD,
  },

  virus: {
    height: 175,
    position: 'absolute',
    right: 10,
    top: 15,
    width: 170.7142857143,
  },

  title: {
    color: Colors.WHITE,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  subtitle: {
    color: Colors.BRINK_PINK,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  heading: {
    color: Colors.WHITE,
    fontSize: 26,
    marginLeft: 20,
  },

  content: {
    padding : 15,
  },

  row: {
    flexDirection: 'row',
  },

  infoTitle: {
    color: Colors.KASHMIR_BLUE,
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 15,
  },
  
  symptomView: {
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    borderTopRightRadius: 130,
    height: 185,
    marginTop: 60,
    flex: 1,
  },

  symptomViewLeft: {
    marginRight: 20,
  },

  symptom: {
    height: 128,
    left: 0,
    position: 'absolute',
    top: -60,
    width: 128,
  },

  symptomNumber: {
    color: Colors.KASHMIR_BLUE,
    fontSize: 26,
    fontWeight: '900',
    marginLeft: 20,
    marginTop: 80,
  },

  symptomText: {
    color: Colors.KASHMIR_BLUE,
    fontSize: 26,
    fontWeight: '600',
    marginLeft: 20,
  },


});

export default style;
