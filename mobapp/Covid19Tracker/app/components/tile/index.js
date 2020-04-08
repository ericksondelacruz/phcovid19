import React from 'react';
import { 
  Text,
  View
} from 'react-native';

const Tile = (props) => {
  const { label, totalValue, addedValue, tileStyle, textStyle, numberStyle, additionalText = false, additionalTextStyle } = props;

  return (
    <View style={tileStyle}>
      <Text style={textStyle}>{label}</Text>
      <Text style={numberStyle}>{`${totalValue} ${addedValue != undefined ? `+(${addedValue})` : ''}`}</Text>
      {
        (additionalText.length > 0) && 
          <Text style={additionalTextStyle}>{additionalText}</Text>
      }
    </View>
  )
}

export default Tile;