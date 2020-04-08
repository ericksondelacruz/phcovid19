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
import hospital from '../../assets/image/hospital.png';
import province from '../../assets/image/province.png';
import { formatNumber, getCountryCode } from '../../utils/helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const PH_LOCAL_CASES_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/ArcGIS/rest/services/PH_masterlist/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=FID%20ASC`;
const PH_CASES_BY_AGE_GROUP_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/age_group/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&groupByFieldsForStatistics=age_categ%2Csex&outStatistics=%5B%7B%22statisticType%22%3A%22count%22%2C%22onStatisticField%22%3A%22FID%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true`;
const PH_CONFIRMED_CASES_TREND_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/confirmed/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=date%20ASC`;

const PhilippineCases = (props) => {
  const { navigation } = props;

  const [isProvince, setIsProvince] = useState(true);
  const [localCase, setLocalCase] = useState({

  });

  const [casesByGroup, setCasesByGroup] = useState({
    
  });

  const [confirmedCasesTrend, setConfirmedCasesTrend] = useState({

  });

  useEffect(() => {
    getPHLocalCases();
    getPHCasesByGroup();
    getPHConfirmedCasesTrend();
  }, []);

  const getPHLocalCases = () => {
    axios.get(PH_LOCAL_CASES_API).then(response => {
      // console.log('features : ', response.data.features);

      // setLocalCase(response.data.features);
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getPHCasesByGroup = () => {
    axios.get(PH_CASES_BY_AGE_GROUP_API).then(response => {
      // console.log('features : ', response.data.features);

      // setCasesByGroup(response.data.features);
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getPHConfirmedCasesTrend = () => {
    axios.get(PH_CONFIRMED_CASES_TREND_API).then(response => {
      // console.log('features : ', response.data.features);

      // setConfirmedCasesTrend(response.data.features);
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
            <Text style={style.title}>PHILIPPINES</Text>
            <Text style={style.subtitle}>COVID-19</Text>
            {
              isProvince ?
                <>
                  <Text style={style.heading}>Cases Per</Text>
                  <Text style={style.heading}>Province</Text>
                  <Image style={style.province} source={province}/>
                </>
              :
                <>
                  <Text style={style.heading}>Cases Per</Text>
                  <Text style={style.heading}>Hospital</Text>
                  <Image style={style.hospital} source={hospital}/>
                </>
            }

          </View>
          <ScrollView contentContainerStyle={style.content} bounces={false}>
            
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default PhilippineCases;