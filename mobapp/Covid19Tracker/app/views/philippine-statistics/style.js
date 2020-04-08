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

  statistics: {
    height: 256,
    position: 'absolute',
    right: 14,
    top: -20,
    width: 256,
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

  pieChart: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 10,

    shadowOffset			: { 
      height	: 0.4, 
      width		: 0.4
    },
    shadowOpacity			: 0.2, 
    shadowRadius			: 1,
  },

  barChart: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    paddingBottom: 0,

    shadowOffset			: { 
      height	: 0.4, 
      width		: 0.4
    },
    shadowOpacity			: 0.2, 
    shadowRadius			: 1,
  },

  lineChart: {
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    paddingBottom: 0,

    shadowOffset			: { 
      height	: 0.4, 
      width		: 0.4
    },
    shadowOpacity			: 0.2, 
    shadowRadius			: 1,
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


  filterButtonView: {
    flexDirection: 'row',
  },

  filterButton : {
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    marginBottom: 10,
    marginTop: -10,
  },

  filterButtonText: {
    fontWeight: 'bold',
  },

  filterButtonConfirmed: {
    backgroundColor: Colors.KASHMIR_BLUE,
  },

  filterButtonDeath: {
    backgroundColor: Colors.BRINK_PINK,
  },

  filterButtonRecovered: {
    backgroundColor: Colors.GREEN,
  },

  activeFilterButtonText: {
    color: Colors.WHITE,
  },

  confirmed: {
    borderColor: Colors.KASHMIR_BLUE,
    color: Colors.KASHMIR_BLUE,
  },

  recovered: {
    borderColor: Colors.GREEN,
    color: Colors.GREEN,
  },

  death: {
    borderColor: Colors.BRINK_PINK,
    color: Colors.BRINK_PINK,
  }

});

export default style;
