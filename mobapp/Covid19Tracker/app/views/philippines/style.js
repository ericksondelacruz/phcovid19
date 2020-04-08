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
    height: '30%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: Colors.PICKLED_BLUEWOOD,
  },

  philippines: {
    height: 312, // 624
    position: 'absolute',
    right: -20,
    top: -60,
    width: 234, // 468
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

  tileRow: {
    flexDirection: 'row',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  tile: {
    flex: 1,
    width: 'auto',
    backgroundColor: Colors.WHITE,
    marginBottom: 10,
    padding: 15,
    paddingTop: 20,
    borderRadius: 5,

    shadowOffset			: { 
      height	: 0.4, 
      width		: 0.4
    },
    shadowOpacity			: 0.2, 
    shadowRadius			: 1,
  },

  tileMain: {
    paddingLeft: 20, 
    paddingTop: 40, 
  },

  tileMainText: {
    color: Colors.KASHMIR_BLUE,
    fontSize: 20,
    fontWeight: 'bold',
  },

  tileMainNumber: {
    color: Colors.KASHMIR_BLUE,
    fontWeight: '800',
    fontSize: 38,
    paddingBottom: 5,
    paddingTop: 5,
  },

  tileLeft: {
    marginRight: 5,
  },

  tileRight: {
    marginLeft: 5,
  },

  tileText: {
    color: Colors.PICKLED_BLUEWOOD,
    fontSize: 16,
  },

  tileNumber: {
    color: Colors.PICKLED_BLUEWOOD,
    fontWeight: 'bold',
    fontSize: 28,
  },

  confirmed: {
    color: Colors.KASHMIR_BLUE
  },

  active: {
    color: Colors.ORANGE,
  },  

  deaths: {
    color: Colors.VALENCIA
  },

  recovered: {
    color: Colors.GREEN
  },

  normal: {
    color: Colors.PICKLED_BLUEWOOD
  },
  
  button: {
    backgroundColor: Colors.PICKLED_BLUEWOOD,
    borderRadius: 15,
    height: 100,
    marginBottom: 10,
    padding: 15,
    
    shadowOffset			: { 
      height	: 0.4, 
      width		: 0.4
    },
    shadowOpacity			: 0.2, 
    shadowRadius			: 1,
  },

  virus: {
    position: 'absolute',
    height: 86,
    width: 86,
    right: 10,
    top: 8,
  },

  world: {
    position: 'absolute',
    height: 81.8181818182,
    width: 159.8863636364,
    right: 15,
    top: 8,
  },

  buttonText: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    // textAlign: 'center',
  },

});

export default style;
