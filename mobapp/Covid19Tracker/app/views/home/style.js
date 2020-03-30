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
    flex : 1,
    borderBottomLeftRadius: 400,
    borderBottomRightRadius: 2000,
    backgroundColor: Colors.PICKLED_BLUEWOOD,
    // overflow: 'hidden',
  },

  worldMap: {
    position: 'absolute',
    height: 180,
    width: 351.75,
    left: 13,
    bottom: 40,
  },

  virus: {
    position: 'absolute',
  },

  position1: {
    width: 120,
    height: 120,
    right: -20,
    top: -90
  },

  position2: {
    width: 30,
    height: 30,
    right: 115,
    top: -55
  },

  position3: {
    width: 50,
    height: 50,
    right: 90,
    top: 25
  },

  position4: {
    width: 60,
    height: 60,
    right: -30,
    top: 45
  },

  title: {
    color: Colors.WHITE,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  subtitle: {
    color: Colors.WHITE,
    fontSize: 26,
    marginLeft: 20,
  },

  content: {
    padding : 15,
  },

  tileRow: {
    flexDirection: 'row',
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

  tileTopLeft: {
    borderTopLeftRadius: 30,
    marginRight: 5,
  },

  tileTopRight: {
    borderTopRightRadius: 30,
    marginLeft: 5,
  },

  tileCenterLeft: {
    marginRight: 5,
  },

  tileCenterRight: {
    marginLeft: 5,
  },

  tileBottomLeft: {
    borderBottomLeftRadius: 30,
    marginRight: 5,
    marginBottom: 20,
  },

  tileBottomRight: {
    borderBottomRightRadius: 30,
    marginLeft: 5,
    marginBottom: 20,
  },

  world: {
    height: 64,
    justifyContent: 'flex-end',
  },

  textWorld: {
    color: Colors.PICKLED_BLUEWOOD,
    fontSize: 28,
    fontWeight: 'bold',
  },

  country: {
    color: Colors.PICKLED_BLUEWOOD,
    fontSize: 22,
    fontWeight: 'bold',
  },

  number: {
    color: Colors.VALENCIA,
    fontSize: 18,
    fontWeight: 'bold',
  },

  text: {
    color: Colors.PICKLED_BLUEWOOD,
    fontSize: 16,
    fontWeight: 'normal',
  },

  
  button: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: Colors.PICKLED_BLUEWOOD,
    
    shadowOffset			: { 
      height	: 0.4, 
      width		: 0.4
    },
    shadowOpacity			: 0.2, 
    shadowRadius			: 1,
  },

  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default style;
