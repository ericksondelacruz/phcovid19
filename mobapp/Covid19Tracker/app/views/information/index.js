import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import axios from 'axios';
import style from './style';
import virus from '../../assets/image/virus.png';
import symptom1 from '../../assets/image/symptom1.png';
import symptom2 from '../../assets/image/symptom2.png';
import symptom3 from '../../assets/image/symptom3.png';
import symptom4 from '../../assets/image/symptom4.png';
import { formatNumber, getCountryCode } from '../../utils/helper';

const COVID19_SUMMARY_API = `https://api.covid19api.com/summary`;
const COVID19_WORLD_API = `https://corona.lmao.ninja/all`;

const Information = (props) => {
  const { navigation } = props;


  useEffect(() => {
  }, []);

  return (
    <>
      <SafeAreaView style={style.topSafeAreaView} />
      <SafeAreaView style={style.safeAreaView}>
        <View style={style.container}>  
          <View style={style.header}>
              <Image style={style.virus} source={virus}/>
            <Text style={style.subtitle}>COVID-19</Text>
            <Text style={style.title}>Symptoms</Text>
          </View>
          <ScrollView contentContainerStyle={style.content} bounces={false}>

            <Text style={style.infoTitle}>Symptoms</Text>
            <View style={style.row}>
              <View style={[style.symptomView, style.symptomViewLeft]}>
                <Image style={style.symptom} source={symptom1}/>
                <Text style={style.symptomNumber}>#1</Text>
                <Text style={style.symptomText}>Coughing</Text>
              </View>
              <View style={style.symptomView}>
                <Image style={style.symptom} source={symptom2}/>
                <Text style={style.symptomNumber}>#2</Text>
                <Text style={style.symptomText}>Fever</Text>
              </View>
            </View>
            <View style={style.row}>
              <View style={[style.symptomView, style.symptomViewLeft]}>
                <Image style={style.symptom} source={symptom3}/>
                <Text style={style.symptomNumber}>#3</Text>
                <Text style={style.symptomText}>Fatigue</Text>
              </View>
              <View style={style.symptomView}>
                <Image style={style.symptom} source={symptom4}/>
                <Text style={style.symptomNumber}>#4</Text>
                <Text style={style.symptomText}>Difficulty Breathing</Text>
              </View>
            </View>

            {/* <Text style={style.infoTitle}>Symptoms</Text> */}


          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Information;