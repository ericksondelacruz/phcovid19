import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Flag from 'react-native-flags';
import style from './style';
import statistics from '../../assets/image/chart.png';
import TileHeader from '../../components/tile-header';
import { formatNumber, getCountryCode } from '../../utils/helper';
import Colors from '../../utils/colors';

const PH_LOCAL_CASES_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/ArcGIS/rest/services/PH_masterlist/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=FID%20ASC`;
const PH_CASES_BY_AGE_GROUP_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/age_group/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&groupByFieldsForStatistics=age_categ%2Csex&outStatistics=%5B%7B%22statisticType%22%3A%22count%22%2C%22onStatisticField%22%3A%22FID%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true`;
const PH_CONFIRMED_CASES_TREND_API = `https://api.covid19api.com/country/philippines/status/confirmed/live`;
const PH_DEATHS_CASES_TREND_API = `https://api.covid19api.com/country/philippines/status/deaths/live`;
const PH_RECOVERED_CASES_TREND_API = `https://api.covid19api.com/country/philippines/status/recovered/live`;

const chartConfig = {
  backgroundGradientFrom: Colors.WHITE,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: Colors.WHITE,
  backgroundGradientToOpacity: 1,
  color: () => Colors.KASHMIR_BLUE,
  labelColor: () => Colors.KASHMIR_BLUE,
  barPercentage: 1,
}

const PhilippineStatistics = (props) => {
  const { navigation } = props;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [localCase, setLocalCase] = useState({

  });
  const [casesByGroup, setCasesByGroup] = useState([]);
  const [confirmedCasesTrend, setConfirmedCasesTrend] = useState([]);
  const [filterType, setFilterType] = useState('confirmed')

  useEffect(() => {
    // getPHLocalCases();
    getPHCasesByGroup();
  }, []);

  useEffect(() => {
    getPHCasesTrend();
  }, [filterType]);

  const refreshData = () => {
    let PH_CASES_TREND_API;
    if (filterType === 'confirmed') {
      PH_CASES_TREND_API = PH_CONFIRMED_CASES_TREND_API;
    } else if (filterType === 'deaths') {
      PH_CASES_TREND_API = PH_DEATHS_CASES_TREND_API;
    } else if (filterType === 'recovered') {
      PH_CASES_TREND_API = PH_RECOVERED_CASES_TREND_API;
    }
    setIsRefreshing(prevState => !prevState);
    axios.all([
      axios.get(PH_CASES_BY_AGE_GROUP_API),
      axios.get(PH_CASES_TREND_API)
    ]).then(([response1, response2]) => {
      setIsRefreshing(prevState => !prevState);
      setCasesByGroup(response1.data.features);
      setConfirmedCasesTrend(response2.data);
    }).catch(error => {
      console.log('error : ', error);
      setIsRefreshing(prevState => !prevState);
    });
  }

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

      setCasesByGroup(response.data.features);
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const getPHCasesTrend = () => {
    let PH_CASES_TREND_API;
    if (filterType === 'confirmed') {
      PH_CASES_TREND_API = PH_CONFIRMED_CASES_TREND_API;
    } else if (filterType === 'deaths') {
      PH_CASES_TREND_API = PH_DEATHS_CASES_TREND_API;
    } else if (filterType === 'recovered') {
      PH_CASES_TREND_API = PH_RECOVERED_CASES_TREND_API;
    }

    axios.get(PH_CASES_TREND_API).then(response => {
      // console.log('response : ', response.data);

      setConfirmedCasesTrend(response.data);
    }).catch(error => {
      console.log('error : ', error);
    });
  }

  const casesByGroupMale = casesByGroup.length !== 0 ? casesByGroup.filter(value => value.attributes.sex === 'Male').sort((a, b) => a.attributes.age_categ.slice(0,1) - b.attributes.age_categ.slice(0,1)).map(value => {return [value.attributes.value]}) : [];
  const casesByGroupFemale = casesByGroup.length !== 0 ? casesByGroup.filter(value => value.attributes.sex === 'Female').sort((a, b) => a.attributes.age_categ.slice(0,1) - b.attributes.age_categ.slice(0,1)).map(value => {return [value.attributes.value]}) : [];
  const casesByGroupTotal = casesByGroupFemale.map((value, index) => { return [value[0] + casesByGroupMale[index][0] ] } ); 
  // const casesByGroupTotal = casesByGroupFemale.map((value, index) => { return [value[0], casesByGroupMale[index][0] ] } ); 
  // console.log('casesByGroupMale : ', casesByGroupMale);
  // console.log('casesByGroupFemale : ', casesByGroupFemale);
  // console.log('casesByGroupTotal : ', casesByGroupTotal);

  const confirmedMale = casesByGroup.length > 0 ? casesByGroup.filter(value => value.attributes.sex === 'Male').map(value => value.attributes.value).reduce((a, b) => a + b) : 0;
  const confirmedFemale = casesByGroup.length > 0 ? casesByGroup.filter(value => value.attributes.sex === 'Female').map(value => value.attributes.value).reduce((a, b) => a + b) : 0;
  // console.log('confirmedMale : ', confirmedMale);
  // console.log('confirmedFemale : ', confirmedFemale);

  const cummulativeCasesOverTime = confirmedCasesTrend.length > 0 ? confirmedCasesTrend.map(value => value.Cases) : [0];
  const cummulativeCasesDate = confirmedCasesTrend.length > 0 ? confirmedCasesTrend.map(value => moment(value.Date).format('MMMM DD, YYYY')) : [''];
  const cummulativeCasesIndexHidden = confirmedCasesTrend.length > 0 ? confirmedCasesTrend.map((value, index) => {if (moment(value.Date).format('DD') !== '01' && moment(value.Date).format('DD') !== '15') {return index}}).filter(value => value != undefined) : [0];
  // console.log('cummulativeCasesOverTime : ', cummulativeCasesOverTime);
  // console.log('cummulativeCasesDate : ', cummulativeCasesDate);
  // console.log('cummulativeCasesIndexHidden : ', cummulativeCasesIndexHidden);

  return (
    <>
      <SafeAreaView style={style.topSafeAreaView} />
      <SafeAreaView style={style.safeAreaView}>
        <View style={style.container}>  
          <View style={style.header}>
            <Image style={style.statistics} source={statistics}/>
            <Text style={style.title}>PHILIPPINES</Text>
            <Text style={style.subtitle}>COVID-19</Text>
            <Text style={style.heading}>Statistics</Text>
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

            <TileHeader title={'CASES BY GENDER'} button={false}/>
            <PieChart
              data={[
                { 
                  name: 'Male', 
                  population: confirmedMale,
                  color: Colors.KASHMIR_BLUE, 
                  legendFontColor: Colors.KASHMIR_BLUE, 
                  legendFontSize: 16 
                },
                { 
                  name: 'Female', 
                  population: confirmedFemale, 
                  color: Colors.BRINK_PINK, 
                  legendFontColor: Colors.BRINK_PINK, 
                  legendFontSize: 16 
                }
              ]}
              height={280}
              width={useWindowDimensions().width - 30}
              paddingLeft={30}
              chartConfig={chartConfig}
              accessor="population"
              style={style.pieChart}
            />

            <TileHeader title={'CASES BY AGE GROUP'} button={false}/>
            <ScrollView horizontal={true} bounces={false}>
              <StackedBarChart
                decimalPlaces={0}
                data={{  
                  legend: ["Confirmed"],
                  labels: casesByGroup.length !== 0 ? casesByGroup.filter(value => value.attributes.sex === 'Male').sort((a, b) => a.attributes.age_categ.slice(0,1) - b.attributes.age_categ.slice(0,1)).map(value => value.attributes.age_categ.slice(0, 2)) : [],
                  data: casesByGroupTotal,
                  barColors: [Colors.LIGHT_BRINK_PINK , Colors.SKY_BLUE, Colors.BRINK_PINK],
                }}
                width={700}
                height={400}
                chartConfig={chartConfig}
                style={style.barChart}
              />
            </ScrollView>

            <TileHeader title={'CUMMULATIVE CASES OVER TIME'} button={false}/>
            <View style={style.filterButtonView}>
              <TouchableOpacity
                style={[style.filterButton, style.confirmed, filterType === 'confirmed' && style.filterButtonConfirmed]}
                onPress={() => setFilterType('confirmed')}
              >
                <Text style={[style.filterButtonText, style.confirmed, filterType === 'confirmed' && style.activeFilterButtonText]}>
                  Confirmed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.filterButton, style.death, filterType === 'deaths' && style.filterButtonDeath]}
                onPress={() => setFilterType('deaths')}
              >
                <Text style={[style.filterButtonText, style.death, filterType === 'deaths' && style.activeFilterButtonText]}>
                  Deaths
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[style.filterButton, style.recovered, filterType === 'recovered' && style.filterButtonRecovered]}
                onPress={() => setFilterType('recovered')}
              >
                <Text style={[style.filterButtonText, style.recovered, filterType === 'recovered' && style.activeFilterButtonText]}>
                  Recovered
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} bounces={false}>
              <LineChart
                data={{
                  labels: cummulativeCasesDate,
                  datasets: [
                    {
                      data: cummulativeCasesOverTime,
                    }
                  ]
                }}
                onDataPointClick={(value) => console.log('HEY : ', value.value)}
                hidePointsAtIndex={cummulativeCasesIndexHidden}
                formatXLabel={(value) => `${value}`}
                width={1000}
                height={400}
                yAxisInterval={1}
                chartConfig={{
                  ...chartConfig,
                  decimalPlaces: 0,
                  color: () => filterType === 'confirmed' ? Colors.KASHMIR_BLUE : filterType === 'recovered' ? Colors.GREEN : Colors.BRINK_PINK,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "3",
                    stroke: filterType === 'confirmed' ? Colors.KASHMIR_BLUE : filterType === 'recovered' ? Colors.GREEN : Colors.BRINK_PINK,
                  }
                }}
                bezier
                style={style.lineChart}
              />
            </ScrollView>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default PhilippineStatistics;