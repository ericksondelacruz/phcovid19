import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Image,
  SafeAreaView,
  Text,
  View
} from 'react-native';
import moment from 'moment';
import style from './style';
import virus1 from '../../assets/image/virus1.png';
import { formatNumber } from '../../utils/helper';

const COVID19_LIVE_COUNTRY_STATUS_API = `https://api.covid19api.com/country/_COUNTRY_/status/_CASES_/live`;
const PH_LOCAL_CASES_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/ArcGIS/rest/services/PH_masterlist/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=FID%20ASC`;

const Country = (props) => {
  const { route, navigation } = props;

  const [country, setCountry] = useState(route.params);
  const [localCases, setLocalCases] = useState([]);

  useEffect(() => {
    // getCovid19CaseByCountryName();
    getPhilippineCases();
  }, []);

  const getCovid19CaseByCountryName = () => {
    const LIVE_COUNTRY_STATUS_API     = COVID19_LIVE_COUNTRY_STATUS_API.replace('_COUNTRY_', country.Slug); 
    const LIVE_COUNTRY_CONFIRMED_API  = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'confirmed'); 
    const LIVE_COUNTRY_RECOVERED_API  = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'recovered'); 
    const LIVE_COUNTRY_DEATHS_API     = LIVE_COUNTRY_STATUS_API.replace('_CASES_', 'deaths'); 

    const LIVE_COUNTRY_MULTIPLE_API = [
      axios.get(LIVE_COUNTRY_CONFIRMED_API),
      axios.get(LIVE_COUNTRY_RECOVERED_API),
      axios.get(LIVE_COUNTRY_DEATHS_API)
    ];

    axios.all(LIVE_COUNTRY_MULTIPLE_API).then(([confirmedResponse, recoveredResponse, deathsReponse]) => {
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
      })
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getPhilippineCases = () => {
    axios.get(PH_LOCAL_CASES_API).then(response => {
      console.log('features : ', response.data.features);
      setLocalCases(response.data.features);
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  return (
    <>
      <SafeAreaView style={style.topSafeAreaView} />
      <SafeAreaView style={style.container}>
        <View style={style.header}>
          <Image style={[style.virus, style.virusPosition1]} source={virus1}/>
          <Image style={[style.virus, style.virusPosition2]} source={virus1}/>
          <Image style={[style.virus, style.virusPosition3]} source={virus1}/>
          <Image style={[style.virus, style.virusPosition4]} source={virus1}/>
          <Text style={style.title}>{country.Country}</Text>
          <Text style={style.subheading}>{`As of ${moment(country.Date).format('LT MMMM DD, YYYY')}`}</Text>
        </View>
        <View style={style.content}>

          <View style={[style.tile, style.tileActive]}>
            <View style={style.circle}>
              <Text style={style.activeNumber}>{`${formatNumber(country.TotalConfirmed - (country.TotalRecovered + country.TotalDeaths))}`}</Text>
              <Text style={style.activeText}>Active Cases</Text>
            </View>
          </View>

          <View style={style.tileRow}>
            <View style={style.tile}>
              <Text style={style.tileText}>Total Confirmed Cases</Text>
              <Text style={[style.tileNumber, style.confirmed]}>{`${formatNumber(country.TotalConfirmed)} (+${formatNumber(country.NewConfirmed)})`}</Text>
            </View>
          </View>

          <View style={style.tileRow}>
            <View style={[style.tile, style.tileLeft]}>
              <Text style={style.tileText}>Total Deaths</Text>
              <Text style={[style.tileNumber, style.deaths]}>{`${formatNumber(country.TotalDeaths)} (+${formatNumber(country.NewDeaths)})`}</Text>
            </View>
            <View style={[style.tile, style.tileRight]}>
              <Text style={style.tileText}>Total Recovered</Text>
              <Text style={[style.tileNumber, style.recovered]}>{`${formatNumber(country.TotalRecovered)} (+${formatNumber(country.NewRecovered)})`}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Country;