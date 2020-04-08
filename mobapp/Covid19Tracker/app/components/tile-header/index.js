import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import style from './style';

const TileHeader = (props) => {
  const { title, button = true, buttonText, onPress } = props;
  return (
    <View style={style.tileHeaderContent}>
      <View style={style.tileHeaderView}>
        <View style={style.tileHeaderBullet}></View>
        <Text style={style.tileHeaderText}>{title}</Text>
      </View>
      {
        button &&
          <TouchableOpacity
            onPress={onPress}
            style={[style.button, style.tileHeaderButton]}
          >
            <Text style={style.tileHeaderButtonText}>{buttonText}</Text>
          </TouchableOpacity>
      }
    </View>
  )
}

export default TileHeader;