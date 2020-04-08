import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import axios from 'axios';
import style from './style';
import world from '../../assets/image/world.png';
import { formatNumber, getCountryCode } from '../../utils/helper';
import { SafeAreaView } from 'react-native-safe-area-context';

const COVID19_SUMMARY_API = `https://api.covid19api.com/summary`;
const COVID19_WORLD_API = `https://corona.lmao.ninja/all`;

const News = (props) => {
  const { navigation } = props;


  useEffect(() => {
  }, []);

  return (
    <>
      <SafeAreaView style={style.topSafeAreaView} />
      <SafeAreaView style={style.safeAreaView}>
        <View style={style.container}>  
          <View style={style.header}>
            <Text style={style.subtitle}>COVID-19</Text>
            <Text style={style.title}>Latest News</Text>
          </View>
          <View style={style.content}>

          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default News;