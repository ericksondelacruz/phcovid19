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
    height: '20%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: Colors.PICKLED_BLUEWOOD,
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

});

export default style;
