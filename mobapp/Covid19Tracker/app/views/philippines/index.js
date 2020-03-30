import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import axios from 'axios';
import Flag from 'react-native-flags';
import style from './style';
import virus1 from '../../assets/image/virus1.png';
import virus2 from '../../assets/image/virus2.png';
import virus3 from '../../assets/image/virus3.png';
import philippines from '../../assets/image/PhilippineMap.png';
import { formatNumber, getCountryCode } from '../../utils/helper';
import { SafeAreaView } from 'react-native-safe-area-context';

const COVID19_SUMMARY_API = `https://api.covid19api.com/summary`;
const COVID19_WORLD_API = `https://corona.lmao.ninja/all`;

const Tile = (props) => {
  const { navigation, tileStyle, value } = props;

  return (
    <TouchableOpacity style={[style.tile, tileStyle]} onPress={() => navigation.navigate('Country', value)}>
      <Flag
          code={getCountryCode(value.Country)}
          size={64}
          type='flat'
        />
      <Text style={style.number}>{formatNumber(value.TotalConfirmed)}<Text style={style.text}>{` cases`}</Text></Text>
    </TouchableOpacity>
  )
}

const Home = (props) => {
  const { navigation } = props;

  const [state, setState] = useState({
    data : [],
  });
  const [total, setTotal] = useState({
    cases     : 0,
    deaths    : 0,
    recovered : 0,
    updated   : 0,
    active    : 0,
  });

  const { data } = state;

  useEffect(() => {
    getWorldCovid19Cases();
    getCovid19Data();
  }, []);

  const getCovid19Data = () => {

    axios.get(COVID19_SUMMARY_API).then(response => {
      // console.log('COVID19_SUMMARY_API response : ', response);

      const countries = response.data.Countries.map(country => {
        return{
          ...country,
          Date: response.data.Date,
        }
      });

      setState({
        ...state,
        data : countries,
      })
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getWorldCovid19Cases = () => {
    
    axios.get(COVID19_WORLD_API).then(response => {
      // console.log('COVID19_WORLD_API response : ', response);

      setTotal({
        cases     : response.data.cases,
        deaths    : response.data.deaths,
        recovered : response.data.recovered,
        updated   : response.data.updated,
        active    : response.data.active,
      });
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  return (
    <>
      <SafeAreaView style={style.topSafeAreaView} />
      <SafeAreaView style={style.safeAreaView}>
        <View style={style.container}>  
          <View style={style.header}>
            
            {/* <Image style={style.map} source={philippines}/> */}
            {/* <Image style={[style.virus, style.position1]} source={virus1}/> */}
            {/* <Image style={[style.virus, style.position2]} source={virus1}/> */}
            {/* <Image style={[style.virus, style.position3]} source={virus1}/> */}
            {/* <Image style={[style.virus, style.position4]} source={virus1}/> */}
            <Text style={style.title}>PHILIPPINES</Text>
            <Text style={style.subtitle}>COVID-19</Text>
            <Text style={style.heading}>Updates</Text>
            <View style={style.background}>
            </View>
          </View>
          <View style={style.content}>
            <View style={style.tileRow}>
              <TouchableOpacity style={[style.tile, style.tileTopLeft]} onPress={() => navigation.navigate('Countries', {data: data, total: total})}>
                <View style={style.world}>
                  <Text style={style.textWorld}>{`World`}</Text>
                </View>
                <Text style={style.number}>{`${formatNumber(total.cases)}`}<Text style={style.text}>{` cases`}</Text></Text>
              </TouchableOpacity>
                {
                  data.sort((a,b) => b.TotalConfirmed-a.TotalConfirmed).slice(0,1).map((value,  index) => 
                    <Tile tileStyle={index == 0 && style.tileTopRight} navigation={navigation} value={value} key={index}/>
                  )
                }
            </View>
            <View style={style.tileRow}>
              {
                data.sort((a,b) => b.TotalConfirmed-a.TotalConfirmed).slice(1,3).map((value,  index) => 
                  <Tile tileStyle={[index === 0 && style.tileCenterLeft, index === 1 && style.tileCenterRight]} navigation={navigation} value={value} key={index}/>
                )
              }
            </View>     
            <View style={style.tileRow}>
              {
                data.sort((a,b) => b.TotalConfirmed-a.TotalConfirmed).slice(3,5).map((value,  index) => 
                  <Tile tileStyle={[index === 0 && style.tileBottomLeft, index === 1 && style.tileBottomRight]} navigation={navigation} value={value} key={index}/>
                )
              }
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Countries')}
              style={style.button}
            >
              <Text style={style.buttonText}>
                View More
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;