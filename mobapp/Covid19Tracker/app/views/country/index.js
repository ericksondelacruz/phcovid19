import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from 'react-native';
import moment from 'moment';
import Flag from 'react-native-flags';
import style from './style';
import Tile from '../../components/tile';
import TileHeader from '../../components/tile-header';
import { getCountryCode, formatNumber } from '../../utils/helper';

const COVID19_LIVE_COUNTRY_STATUS_API = `https://api.covid19api.com/country/_COUNTRY_/status/_CASES_/live`;

const Country = (props) => {
  const { route } = props;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [country, setCountry] = useState(route.params);

  useEffect(() => {
    getCovid19CaseByCountryName();
  }, []);

  const refreshData = () => {
    const LIVE_COUNTRY_STATUS_API     = COVID19_LIVE_COUNTRY_STATUS_API.replace('_COUNTRY_', country.Slug); 
    const LIVE_COUNTRY_CONFIRMED_API  = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'confirmed'); 
    const LIVE_COUNTRY_RECOVERED_API  = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'recovered'); 
    const LIVE_COUNTRY_DEATHS_API     = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'deaths'); 
    const LIVE_COUNTRY_MULTIPLE_API   = [
      axios.get(LIVE_COUNTRY_CONFIRMED_API),
      axios.get(LIVE_COUNTRY_RECOVERED_API),
      axios.get(LIVE_COUNTRY_DEATHS_API)
    ];

    setIsRefreshing(prevState => !prevState);
    axios.all(LIVE_COUNTRY_MULTIPLE_API).then(([confirmedResponse, recoveredResponse, deathsReponse]) => {
      setIsRefreshing(prevState => !prevState);
      if (confirmedResponse.data[0].Province) {

      } else {
        const confirmedCase = confirmedResponse.data[confirmedResponse.data.length - 1];
        const recoveredCase = recoveredResponse.data[recoveredResponse.data.length - 1];
        const deathsCase = deathsReponse.data[deathsReponse.data.length - 1];
  
        setCountry({
          ...country,
          Date: confirmedCase.Date,
          NewConfirmed: confirmedCase.Cases - route.params.TotalConfirmed,
          NewDeaths: deathsCase.Cases - route.params.TotalDeaths,
          NewRecovered: recoveredCase.Cases - route.params.TotalRecovered,
          TotalConfirmed: confirmedCase.Cases,
          TotalDeaths: deathsCase.Cases,
          TotalRecovered: recoveredCase.Cases,
        });
      }
    }).catch(error => {
      console.log('error : ', error);
      setIsRefreshing(prevState => !prevState);
    });
  }

  const getCovid19CaseByCountryName = () => {
    const LIVE_COUNTRY_STATUS_API     = COVID19_LIVE_COUNTRY_STATUS_API.replace('_COUNTRY_', country.Slug); 
    const LIVE_COUNTRY_CONFIRMED_API  = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'confirmed'); 
    const LIVE_COUNTRY_RECOVERED_API  = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'recovered'); 
    const LIVE_COUNTRY_DEATHS_API     = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'deaths'); 
    const LIVE_COUNTRY_MULTIPLE_API   = [
      axios.get(LIVE_COUNTRY_CONFIRMED_API),
      axios.get(LIVE_COUNTRY_RECOVERED_API),
      axios.get(LIVE_COUNTRY_DEATHS_API)
    ];

    axios.all(LIVE_COUNTRY_MULTIPLE_API).then(([confirmedResponse, recoveredResponse, deathsReponse]) => {
      if (confirmedResponse.data[0].Province) {

      } else {
        const confirmedCase = confirmedResponse.data[confirmedResponse.data.length - 1];
        const recoveredCase = recoveredResponse.data[recoveredResponse.data.length - 1];
        const deathsCase = deathsReponse.data[deathsReponse.data.length - 1];
  
        setCountry({
          ...country,
          Date: confirmedCase.Date,
          NewConfirmed: confirmedCase.Cases - route.params.TotalConfirmed,
          NewDeaths: deathsCase.Cases - route.params.TotalDeaths,
          NewRecovered: recoveredCase.Cases - route.params.TotalRecovered,
          TotalConfirmed: confirmedCase.Cases,
          TotalDeaths: deathsCase.Cases,
          TotalRecovered: recoveredCase.Cases,
        });
      }
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
            {/* <Image style={[style.virus, style.virusPosition2]} source={virus1}/> */}
            <View style={style.titleView}>
              <Flag
                code={country.CountryCode}
                size={64}
                type='flat'
              />
              <Text style={style.title}>{country.Country.toUpperCase()}</Text>
            </View>
            <Text style={style.subtitle}>COVID-19</Text>
            <Text style={style.heading}>Updates</Text>
          </View>
          <ScrollView 
            contentContainerStyle={style.content}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshData}
              />
            }
          >

            <Tile 
              label={'Confirmed'}
              totalValue={formatNumber(country.TotalConfirmed)} 
              addedValue={formatNumber(country.NewConfirmed)} 
              tileStyle={[style.tile, style.tileMain]}
              textStyle={style.tileMainText}
              numberStyle={style.tileMainNumber}
              additionalText={`As of ${moment(country.Date).format('LT MMMM DD, YYYY')}`}
              additionalTextStyle={style.tileText}
            />

            <TileHeader title={'CASES'} button={false} />
            <Tile 
              label={'Active'}
              totalValue={formatNumber(country.TotalConfirmed - (country.TotalRecovered + country.TotalDeaths))} 
              addedValue={formatNumber(country.NewConfirmed)} 
              tileStyle={style.tile}
              textStyle={style.tileText}
              numberStyle={[style.tileNumber, style.active]}
            />

            <View style={style.tileRow}>
              <Tile 
                label={'Deaths'}
                totalValue={formatNumber(country.TotalDeaths)} 
                addedValue={formatNumber(country.NewDeaths)} 
                tileStyle={[style.tile, style.tileLeft]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.deaths]}
              />
              <Tile 
                label={'Recovered'}
                totalValue={formatNumber(country.TotalRecovered)} 
                addedValue={formatNumber(country.NewRecovered)} 
                tileStyle={[style.tile, style.tileRight]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.recovered]}
              />
            </View>

            <TileHeader title={'RATE'} button={false}/>
            <View style={style.tileRow}>
              <Tile 
                label={'Death Rate'}
                totalValue={`${((country.TotalDeaths * 100) / country.TotalConfirmed).toFixed(2)}%`}  
                tileStyle={[style.tile, style.tileLeft]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.deaths]}
              />
              <Tile 
                label={'Recovery Rate'}
                totalValue={`${((country.TotalRecovered * 100) / country.TotalConfirmed).toFixed(2)}%`} 
                tileStyle={[style.tile, style.tileRight]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.recovered]}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Country;