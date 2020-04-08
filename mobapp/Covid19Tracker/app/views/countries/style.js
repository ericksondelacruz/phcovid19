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
    height: '35%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.PICKLED_BLUEWOOD,
    position: 'relative',
  },

  world: {
    position: 'absolute',
    height: 180,
    width: 351.75,
    left: 60,
    top: 10,
  },

  title: {
    color: Colors.WHITE,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 35,
    marginTop: 75,
  },  

  subheading: {
    color: Colors.WHITE,
    fontSize: 16,
    marginLeft: 35,
    marginBottom: 30,
  },
  
  infoRow: {
    marginLeft: 35,
    flexDirection: 'row',
  },  

  info: {
    flex: 0.4, 
    flexDirection: 'row',
    marginBottom: 10,
  },

  iconContainer: {
    backgroundColor: Colors.KASHMIR_BLUE,
    borderRadius: 10,
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoNumber: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },

  infoDetails: {
    justifyContent: 'center',
  },

  infoText: {
    color: Colors.KASHMIR_BLUE,
    fontSize: 16,
    fontWeight: '500',
  },

  infoConfirmed: {
    color: Colors.SKY_BLUE
  },

  infoActive: {
    color: Colors.LIGHT_ORANGE
  },

  infoDeaths: {
    color: Colors.BRINK_PINK
  },

  infoRecovered: {
    color: Colors.LIGHT_GREEN
  },

  subtitle: {
    color: Colors.PICKLED_BLUEWOOD,
    fontWeight: '500',
    fontSize: 28,
  },

  searchInput: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    color: Colors.PICKLED_BLUEWOOD,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 20,
    padding: 15,
    shadowOffset			: { 
      height	: 0.4, 
      width		: 0.4
    },
    shadowOpacity			: 0.2, 
    shadowRadius			: 1,
  }, 

  content: {
    flex: 1,
    padding : 15,
  },

  tile: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15,

    shadowOffset			: { 
      height	: 0.4, 
      width		: 0.4
    },
    shadowOpacity			: 0.2, 
    shadowRadius			: 1,
  },

  details: {
    marginLeft: 15,
    justifyContent: 'center',
  },

  country: {
    color: Colors.PICKLED_BLUEWOOD,
    fontSize: 22,
    fontWeight: 'bold',
  },

  confirmed: {
    color: Colors.KASHMIR_BLUE,
    fontSize: 16,
  },

  active: {
    color: Colors.ORANGE,
    fontSize: 16,
  },

  row: {
    flexDirection: 'column'
  },

});

export default style;
