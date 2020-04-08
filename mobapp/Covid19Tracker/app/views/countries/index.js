import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
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

const COVID19_SUMMARY_API = `https://api.covid19api.com/summary`;
const COVID19_WORLD_API = `https://corona.lmao.ninja/all`;

const Tile = (props) => {
  const { countries, onPress, value } = props;

  const rank = countries.findIndex(val => val.Country === value.Country);

  return (
    <TouchableOpacity style={style.tile} onPress={onPress}>
      <Flag
        code={value.CountryCode}
        size={64}
        type='flat'
      />
      <View style={style.details}>
        <Text style={style.country}>{`${value.Country} (${rank + 1})`}</Text>
        <Text>
          <Text style={[style.infoNumber, style.confirmed]}>{`${formatNumber(value.TotalConfirmed)} `}</Text>
          <Text style={[style.infoText, style.confirmed]}>{`confirmed`}</Text>
          {` | `}
          <Text style={[style.infoNumber, style.active]}>{`${formatNumber(value.TotalConfirmed - (value.TotalDeaths + value.TotalRecovered ))} `}</Text>
          <Text style={[style.infoText, style.active]}>{`active`}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const Countries = (props) => {
  const { navigation } = props;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [total, setTotal] = useState({
    cases     : 0,
    deaths    : 0,
    recovered : 0,
    updated   : 0,
    active    : 0,
  });
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCovid19Data();
    getWorldCovid19Cases();
  }, []);

  useEffect(() => {
    const newSearchedCountries = countries.filter(cases => cases.Country.includes(search));
    setSearchedCountries(newSearchedCountries);
  }, [search]);

  const refreshData = () => {
    setIsRefreshing(prevState => !prevState);

    axios.all([
      axios.get(COVID19_SUMMARY_API),
      axios.get(COVID19_WORLD_API)
    ]).then(([response1, response2]) => {
      console.log('success');

      const filteredCountries = response1.data.Countries.filter(value => filterCountry(value.Country)).sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).map(country => {
        return{
          ...country,
          Date: response1.data.Date,
        }
      });

      setIsRefreshing(prevState => !prevState);
      setCountries(filteredCountries);
      setSearchedCountries(filteredCountries);
      setTotal({
        cases     : response2.data.cases,
        deaths    : response2.data.deaths,
        recovered : response2.data.recovered,
        updated   : response2.data.updated,
        active    : response2.data.active,
      });
    }).catch(error => {
      console.log('error : ', error);
      setIsRefreshing(prevState => !prevState);
    })
  }

  const filterCountry = (country) => {
    if (country === 'Korea, South' || country === 'Republic of Korea' ||country === 'Iran (Islamic Republic of)' || country === 'Russian Federation' || country === 'Taiwan*' || country === 'Viet Nam')
      return false  
  
    return true;
  }

  const getCovid19Data = () => {
    axios.get(COVID19_SUMMARY_API).then(response => {
      // console.log('COVID19_SUMMARY_API response : ', response);

      const filteredCountries = response.data.Countries.filter(value => filterCountry(value.Country)).sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).map(country => {
        return{
          ...country,
          Date: response.data.Date,
        }
      });

      console.log('filteredCountries : ', filteredCountries);
      setCountries(filteredCountries);
      setSearchedCountries(filteredCountries)
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

  const onChangeText = (value) => {
    setSearch(value);
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
          <Text style={style.title}>WORLD NUMBERS</Text>
          <Text style={style.subheading}>{`As of ${moment(total.updated).format('LT MMMM DD, YYYY')}`}</Text>

          <View style={style.infoRow}>
            <View style={style.info}>
              <View style={style.iconContainer}>
                <Text style={style.infoNumber}>X</Text>
              </View>
              <View style={style.infoDetails}>
                <Text style={style.infoNumber}>{`${formatNumber(total.cases)}`}</Text>
                <Text style={[style.infoText, style.infoConfirmed]}>confirmed</Text>
              </View>
            </View>
            <View style={style.info}>
              <View style={style.iconContainer}>
                <Text style={style.infoNumber}>X</Text>
              </View>
              <View style={style.infoDetails}>
                <Text style={style.infoNumber}>{`${formatNumber(total.active)}`}</Text>
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
                <Text style={style.infoNumber}>{`${formatNumber(total.deaths)}`}</Text>
                <Text style={[style.infoText, style.infoDeaths]}>deaths</Text>
              </View>
            </View>
            <View style={style.info}>
              <View style={style.iconContainer}>
                <Text style={style.infoNumber}>X</Text>
              </View>
              <View style={style.infoDetails}>
                <Text style={style.infoNumber}>{`${formatNumber(total.recovered)}`}</Text>
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
          <FlatList
            data={searchedCountries}
            renderItem={({ item }) => <Tile countries={countries} value={item} onPress={() => navigation.navigate('Country', item)}/>}
            keyExtractor={item => item.Country}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshData}
              />
            }
          />
        </View>
      </View>
    </>
  );
}

export default Countries;