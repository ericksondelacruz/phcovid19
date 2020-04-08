import React, { useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Flag from 'react-native-flags';
import style from './style';
import philippines from '../../assets/image/PH.png';
import virus from '../../assets/image/virus.png';
import world from '../../assets/image/world.png';
import Tile from '../../components/tile';
import TileHeader from '../../components/tile-header';
import { formatNumber, getCountryCode } from '../../utils/helper';

const PH_LOCAL_CASES_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/ArcGIS/rest/services/PH_masterlist/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=FID%20ASC`;
const PH_COUNT_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/slide_fig/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*`;
const PH_LIVE__STATUS_API = `https://api.covid19api.com/country/philippines/status/_CASES_/live`;
const PH_CASES_BY_AGE_GROUP_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/age_group/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&groupByFieldsForStatistics=age_categ%2Csex&outStatistics=%5B%7B%22statisticType%22%3A%22count%22%2C%22onStatisticField%22%3A%22FID%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true`;
const PH_CONFIRMED_CASES_TREND_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/confirmed/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=date%20ASC`;
const PH_NEW_CASES = `https://corona.lmao.ninja/countries/philippines`;

const Philippines = (props) => {
  const { navigation } = props;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [total, setTotal] = useState({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    tests: 0,
    PUIs: 0,
    PUMs: 0,
  });
  const [liveCases, setLiveCases] = useState({
    confirmed: 0,
    confirmedDate: '',
    deaths: 0,
    deathsDate: '',
    recovered: 0,
    recoveredDate: '',
  });
  const [newCases, setNewCases] = useState({
    cases: 0,
    todayCases:	0,
    deaths:	0,
    todayDeaths: 0,
    recovered: 0,
    active: 0,
    critical: 0,
    casesPerOneMillion: 0,
    deathsPerOneMillion: 0,
    updated: 0
  });
  const [casesByAgeGroup, setcasesByAgeGroup] = useState('');

  useEffect(() => {
    // getPHLocalCases();
    getPHCount();
    getPHLiveStatus();
    getPHNewCases();
    // getWorldCovid19Cases();
    // getCovid19Data();
  }, []);

  const refreshData = () => {
    const LIVE_COUNTRY_CONFIRMED_API  = PH_LIVE__STATUS_API.replace('_CASES_', 'confirmed'); 
    const LIVE_COUNTRY_RECOVERED_API  = PH_LIVE__STATUS_API.replace('_CASES_', 'recovered'); 
    const LIVE_COUNTRY_DEATHS_API     = PH_LIVE__STATUS_API.replace('_CASES_', 'deaths'); 

    setIsRefreshing(prevState => !prevState);
    axios.all([
      axios.get(PH_COUNT_API),
      axios.get(PH_NEW_CASES),
      axios.get(LIVE_COUNTRY_CONFIRMED_API),
      axios.get(LIVE_COUNTRY_RECOVERED_API),
      axios.get(LIVE_COUNTRY_DEATHS_API)
    ]).then(([response1, response2, response3, response4, response5]) => {
      const confirmedCase = response3.data[response3.data.length - 1];
      const recoveredCase = response4.data[response4.data.length - 1];
      const deathsCase = response5.data[response5.data.length - 1];

      setIsRefreshing(prevState => !prevState);
      setTotal({...response1.data.features[0].attributes});
      setNewCases({...response2.data});
      setLiveCases({
        confirmed: confirmedCase.Cases,
        confirmedDate: confirmedCase.Date,
        deaths: deathsCase.Cases,
        deathsDate: deathsCase.Date,
        recovered: recoveredCase.Cases,
        recoveredDate: recoveredCase.Date,
      });
    }).catch(error => {
      console.log('error : ', error);
      setIsRefreshing(prevState => !prevState);
    });
  }

  const getPHLocalCases = () => {
    axios.get(PH_LOCAL_CASES_API).then(response => {
      // console.log('features : ', response.data.features);

      // setLocalCases(response.data.features);
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getPHCount = () => {
    axios.get(PH_COUNT_API).then(response => {
      // console.log('features : ', response.data.features[0].attributes);

      setTotal({...response.data.features[0].attributes});
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getPHNewCases = () => {
    axios.get(PH_NEW_CASES).then(response => {
      // console.log('response : ', response.data);

      setNewCases({...response.data});
    }).catch(error => {
      console.log('error : ', error);
    });
  }
  
  const getPHLiveStatus = () => {
    const LIVE_COUNTRY_CONFIRMED_API  = PH_LIVE__STATUS_API.replace('_CASES_', 'confirmed'); 
    const LIVE_COUNTRY_RECOVERED_API  = PH_LIVE__STATUS_API.replace('_CASES_', 'recovered'); 
    const LIVE_COUNTRY_DEATHS_API     = PH_LIVE__STATUS_API.replace('_CASES_', 'deaths'); 

    const LIVE_COUNTRY_MULTIPLE_API = [
      axios.get(LIVE_COUNTRY_CONFIRMED_API),
      axios.get(LIVE_COUNTRY_RECOVERED_API),
      axios.get(LIVE_COUNTRY_DEATHS_API)
    ];

    axios.all(LIVE_COUNTRY_MULTIPLE_API).then(([confirmedResponse, recoveredResponse, deathsReponse]) => {
      const confirmedCase = confirmedResponse.data[confirmedResponse.data.length - 1];
      const recoveredCase = recoveredResponse.data[recoveredResponse.data.length - 1];
      const deathsCase = deathsReponse.data[deathsReponse.data.length - 1];

      setLiveCases({
        confirmed: confirmedCase.Cases,
        confirmedDate: confirmedCase.Date,
        deaths: deathsCase.Cases,
        deathsDate: deathsCase.Date,
        recovered: recoveredCase.Cases,
        recoveredDate: recoveredCase.Date,
      });
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getPHCasesByGroup = () => {
    axios.get(PH_CASES_BY_AGE_GROUP_API).then(response => {
      // console.log('features : ', response.data.features[0].attributes);

      // setcasesByAgeGroup();
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getPHConfirmedCasesTrend = () => {
    axios.get(PH_CONFIRMED_CASES_TREND_API).then(response => {
      // console.log('features : ', response.data.features[0].attributes);

      // setcasesByAgeGroup();
    }).catch(error => {
      console.log('error : ', error);
    });
  }


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

  const confirmed = total.confirmed < liveCases.confirmedCase ? liveCases.confirmedCase : total.confirmed ;
  const recovered = total.recovered < liveCases.recoveredCase ? liveCases.recoveredCase : total.recovered ;
  const deaths = total.deaths < liveCases.deathsCase ? liveCases.deathsCase : total.deaths ;
  const recoveryRate = ((recovered * 100) / confirmed);
  const deathRate = ((deaths * 100) / confirmed);
  const date = liveCases.confirmedDate;
  const todayCases = confirmed == newCases.cases ? newCases.todayCases : 0;
  const newConfirmed = confirmed == newCases.cases ? newCases.todayCases : 0;
  const newRecovered = confirmed == newCases.cases ? newCases.recovered : 0;
  const newDeaths = confirmed == newCases.cases ? newCases.todayDeaths : 0;
  const test = liveCases.confirmed;

  // console.log('newCases : ', newCases);
  // console.log('PUMs : ', confirmed);
  // console.log('deaths : ', deaths);

  return (
    <>
      <SafeAreaView style={style.topSafeAreaView} />
      <SafeAreaView style={style.safeAreaView}>
        <View style={style.container}>  
          <View style={style.header}>

            <Image style={style.philippines} source={philippines}/>

            <Text style={style.title}>PHILIPPINES</Text>
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
            <View style={style.tileRow}>
              <Tile 
                label={'Confirmed'}
                totalValue={formatNumber(confirmed)} 
                addedValue={formatNumber(todayCases)} 
                tileStyle={[style.tile, style.tileMain]}
                textStyle={style.tileMainText}
                numberStyle={style.tileMainNumber}
                additionalText={`As of ${moment(date).format('LT MMMM DD, YYYY')}`}
                additionalTextStyle={style.tileText}
              />
            </View>

            <TileHeader title={'CASES'} buttonText={'STATISTICS'} onPress={() => navigation.navigate('PhilippineStatistics')}/>
            <Tile 
                label={'Active'}
                totalValue={formatNumber(confirmed - (deaths + recovered))} 
                addedValue={todayCases} 
                tileStyle={style.tile}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.active]}
              />

            <View style={style.tileRow}>
              <Tile 
                label={'Deaths'}
                totalValue={formatNumber(deaths)} 
                addedValue={formatNumber(newDeaths)} 
                tileStyle={[style.tile, style.tileLeft]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.deaths]}
              />
              <Tile 
                label={'Recovered'}
                totalValue={formatNumber(recovered)} 
                // addedValue={formatNumber(newRecovered)} 
                tileStyle={[style.tile, style.tileRight]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.recovered]}
              />
            </View>

            <TileHeader title={'RATE'} button={false}/>
            <View style={style.tileRow}>
              <Tile 
                label={'Death Rate'}
                totalValue={`${deathRate.toFixed(2)}%`}  
                tileStyle={[style.tile, style.tileLeft]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.deaths]}
              />
              <Tile 
                  label={'Recovery Rate'}
                  totalValue={`${recoveryRate.toFixed(2)}%`} 
                  tileStyle={[style.tile, style.tileRight]}
                  textStyle={style.tileText}
                  numberStyle={[style.tileNumber, style.recovered]}
                />
            </View>

            <TileHeader title={'PUIs & PUMS'} button={false}/>
            <View style={style.tileRow}>
              <Tile 
                label={'Person Under Investigation'}
                totalValue={formatNumber(total.PUIs)}
                tileStyle={[style.tile, style.tileLeft]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.normal]}
              />
              <Tile 
                label={'Person Under Monitoring'}
                totalValue={formatNumber(total.PUMs)} 
                tileStyle={[style.tile, style.tileRight]}
                textStyle={style.tileText}
                numberStyle={[style.tileNumber, style.normal]}
              />
            </View>

            <TileHeader title={'OTHERS'} button={false}/>
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('PhilippineCases')}
              style={style.button}
            >
              <Image style={style.world} source={world}/>
              <Text style={style.buttonText}>
                Cases Per Province/Hospital
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Information')}
              style={style.button}
            >
              <Image style={style.virus} source={virus}/>
              <Text style={style.buttonText}>
                SYMPTOMS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Countries')}
              style={style.button}
            >
              <Image style={style.world} source={world}/>
              <Text style={style.buttonText}>
                WORLD NUMBERS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('News')}
              style={style.button}
            >
              {/* <Image style={style.world} source={world}/> */}
              <Text style={style.buttonText}>
                LATEST NEWS
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Philippines;