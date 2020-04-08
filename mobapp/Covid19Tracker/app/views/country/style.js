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

  titleView: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 40,
    alignItems: 'center',
  },

  title: {
    color: Colors.WHITE,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 10,
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
    // flex: 1,
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

  // tileActive: {
  //   backgroundColor: Colors.BACKGROUND_COLOR,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // circle: {
  //   backgroundColor: Colors.PICKLED_BLUEWOOD,
  //   height: 250,
  //   width: 250,
  //   borderRadius: 250,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // activeNumber: {
  //   color: Colors.VALENCIA,
  //   fontWeight: 'bold',
  //   fontSize: 48,
  // },

  // activeText: {
  //   color: Colors.BRINK_PINK,
  //   fontSize: 26,
  // },  



  // tile: {
  //   flex: 1,
  //   width: 'auto',
  //   backgroundColor: Colors.WHITE,
  //   marginBottom: 10,
  //   padding: 15,
  //   paddingTop: 20,
  //   borderRadius: 5,

  //   shadowOffset			: { 
  //     height	: 0.4, 
  //     width		: 0.4
  //   },
  //   shadowOpacity			: 0.2, 
  //   shadowRadius			: 1,
  // },

  // tileLeft: {
  //   marginRight: 5,
  // },

  // tileRight: {
  //   marginLeft: 5,
  // },

  // tileText: {
  //   color: Colors.PICKLED_BLUEWOOD,
  //   fontSize: 16,
  // },

  // tileNumber: {
  //   color: Colors.PICKLED_BLUEWOOD,
  //   fontWeight: 'bold',
  //   fontSize: 28,
  // },

  // confirmed: {
  //   color: Colors.KASHMIR_BLUE
  // },

  // deaths: {
  //   color: Colors.VALENCIA
  // },

  // recovered: {
  //   color: Colors.GREEN
  // },

});

export default style;
