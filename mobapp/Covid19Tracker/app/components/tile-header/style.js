import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors';

const style = StyleSheet.create({

  tileHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  
  tileHeaderView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  }, 

  tileHeaderBullet: {
    backgroundColor: Colors.KASHMIR_BLUE,
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 10,
  },

  tileHeaderText: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 10,
    color: Colors.KASHMIR_BLUE,
    fontWeight: '500',
  },

  tileHeaderButton: {
    borderRadius: 100,
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.PICKLED_BLUEWOOD,
  },

  tileHeaderButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },

});

export default style;