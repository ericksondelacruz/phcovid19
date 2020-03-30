import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

const style = StyleSheet.create({

  topSafeAreaView: {
    flex: 0,
    backgroundColor: Colors.PICKLED_BLUEWOOD
  },

  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR
  },

  header: {
    height: '30%',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: Colors.PICKLED_BLUEWOOD,
    position: 'relative',
  },

  virus: {
    position: 'absolute',
  },

  virusPosition1: {
    width: 40,
    height: 40,
    right: 160,
    bottom: 10,
  },

  virusPosition2: {
    width: 120,
    height: 120,
    right: 40,
    bottom: 25,
  },

  virusPosition3: {
    width: 20,
    height: 20,
    right: 15,
    bottom: 110,
  },

  virusPosition4: {
    width: 30,
    height: 30,
    right: 70,
    bottom: 155,
  },

  title: {
    color: Colors.WHITE,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 50,
  },  

  subheading: {
    color: Colors.WHITE,
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 20,
  },

  content: {
    flex: 1,
    padding : 15,
  },

  tileActive: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    backgroundColor: Colors.PICKLED_BLUEWOOD,
    height: 250,
    width: 250,
    borderRadius: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeNumber: {
    color: Colors.VALENCIA,
    fontWeight: 'bold',
    fontSize: 48,
  },

  activeText: {
    color: Colors.BRINK_PINK,
    fontSize: 26,
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

  deaths: {
    color: Colors.VALENCIA
  },

  recovered: {
    color: Colors.GREEN
  },

});

export default style;
