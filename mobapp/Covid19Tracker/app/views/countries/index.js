import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';
import Flag from 'react-native-flags';
import style from './style';
import world from '../../assets/image/world.png';
import { formatNumber, getCountryCode } from '../../utils/helper';

const PH_LOCAL_CASES_API = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/ArcGIS/rest/services/PH_masterlist/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=FID%20ASC`;

const Tile = (props) => {
  const { onPress, value } = props;

  return (
    <TouchableOpacity style={style.tile} onPress={onPress}>
      <Flag
        code={getCountryCode(value.Country)}
        size={64}
        type='flat'
      />
      <View style={style.details}>
        <Text style={style.country}>
          <Text style={style.country}>{`${value.Country}`}</Text>
          {` | `}
          <Text style={style.country}>{`${formatNumber(value.TotalConfirmed)} cases`}</Text>
        </Text>
        <Text>
          <Text style={style.death}>{`${formatNumber(value.TotalDeaths)} deaths`}</Text>
          {` | `}
          <Text style={style.recovered}>{`${formatNumber(value.TotalRecovered)} recovered`}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const Countries = (props) => {
  const { navigation, route } = props;

  const [country, setCountry] = useState(route.params.data);
  const [search, setSearch] = useState('');
  const [localCases, setLocalCases] = useState([]);

  useEffect(() => {
    getPhilippineCases();
    if (search !== '') {
      const countries = country.filter(cases => cases.Country.includes(search));
      setCountry(countries);
    } else {
      setCountry(route.params.data);
    }
  }, [search])

  const onChangeText = (value) => {

    setSearch(value);
  }

  const getPhilippineCases = () => {
    axios.get(PH_LOCAL_CASES_API).then(response => {
      // console.log('features : ', response.data.features);

      setLocalCases(response.data.features);
    }).catch(error => {
      console.log('error : ', error);
    });
  }
 
  return (
    <>
      <SafeAreaView style={style.topSafeAreaView} />
      <View style={style.container}>
        <View style={style.header}>

          <Image
            style={style.world}
            source={world}
          />

          <Text style={style.title}>World Statistics</Text>
          <Text style={style.subheading}>{`As of ${moment.unix(route.params.total.updated).format('LT MMMM DD, YYYY')}`}</Text>

          <View style={style.infoRow}>
            <View style={style.info}>
              <View style={style.iconContainer}>
                <Text style={style.infoNumber}>X</Text>
              </View>
              <View style={style.infoDetails}>
                <Text style={style.infoNumber}>{`${formatNumber(route.params.total.cases)}`}</Text>
                <Text style={[style.infoText, style.infoConfirmed]}>confirmed</Text>
              </View>
            </View>
            <View style={style.info}>
              <View style={style.iconContainer}>
                <Text style={style.infoNumber}>X</Text>
              </View>
              <View style={style.infoDetails}>
                <Text style={style.infoNumber}>{`${formatNumber(route.params.total.active)}`}</Text>
                <Text style={[style.infoText, style.infoActive]}>active</Text>
              </View>
            </View>
          </View>
          <View style={style.infoRow}>
            <View style={style.info}>
              <View style={style.iconContainer}>
                <Text style={style.infoNumber}>X</Text>
              </View>
              <View style={style.infoDetails}>
                <Text style={style.infoNumber}>{`${formatNumber(route.params.total.deaths)}`}</Text>
                <Text style={[style.infoText, style.infoDeaths]}>deaths</Text>
              </View>
            </View>
            <View style={style.info}>
              <View style={style.iconContainer}>
                <Text style={style.infoNumber}>X</Text>
              </View>
              <View style={style.infoDetails}>
                <Text style={style.infoNumber}>{`${formatNumber(route.params.total.recovered)}`}</Text>
                <Text style={[style.infoText, style.infoRecovered]}>recovered</Text>
              </View>
            </View>
          </View>

        </View>
        <View style={style.content}>
          <Text style={style.subtitle}>Search Country</Text>
          <TextInput
            autoCapitalize='words'
            clearButtonMode='while-editing'
            placeholder='Country Name'
            style={style.searchInput}
            inlineImageLeft='search_icon'
            value={search}
            onChangeText={onChangeText}
          />
          {/* <FlatList
            data={localCases}
            bounces={false}
            renderItem={({ item }) =>                   
              <TouchableOpacity style={[style.tile, style.row]} onPress={() => navigation.navigate('Country', value)}>
                <Text>{`FID: ${item.attributes.FID}`}</Text>
                <Text>{`PH Mater List: ${item.attributes.PH_masterl}`}</Text>
                <Text>{`Sequ: ${item.attributes.sequ}`}</Text>
                <Text>{`Age: ${item.attributes.edad}`}</Text>
                <Text>{`Gender: ${item.attributes.kasarian}`}</Text>
                <Text>{`Nationality: ${item.attributes.nationalit}`}</Text>
                <Text>{`Residence: ${item.attributes.residence}`}</Text>
                <Text>{`Travel History: ${item.attributes.travel_hx}`}</Text>
                <Text>{`Symptoms: ${item.attributes.symptoms}`}</Text>
                <Text>{`Confirmed: ${item.attributes.confirmed}`}</Text>
                <Text>{`Facility: ${item.attributes.facility}`}</Text>
                <Text>{`Latitude: ${item.attributes.latitude}`}</Text>
                <Text>{`Longitude: ${item.attributes.longitude}`}</Text>
                <Text>{`Status: ${item.attributes.status}`}</Text>
                <Text>{`Epi Link: ${item.attributes.epi_link}`}</Text>
                <Text>{`Date: ${item.attributes.petsa}`}</Text>
              </TouchableOpacity>
            }
            keyExtractor={item => item.attributes.FID}
          /> */}
          <FlatList
            data={country}
            bounces={false}
            renderItem={({ item }) => <Tile value={item} onPress={() => navigation.navigate('Country', item)}/>}
            keyExtractor={item => item.Country}
          />
        </View>
      </View>
    </>
  );
}

export default Countries;