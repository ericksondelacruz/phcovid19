import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Philippines from '../views/philippines';
import PhilippineCases from '../views/philippine-cases';
import PhilippineStatistics from '../views/philippine-statistics';
import Countries from '../views/countries';
import Country from '../views/country';
import Information from '../views/information';
import News from '../views/news';
import GlobalMap from '../views/global-map';
import CountryMap from '../views/country-map';
import Colors from '../utils/colors';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} translucent backgroundColor={Colors.PICKLED_BLUEWOOD}/>
      <Stack.Navigator 
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.PICKLED_BLUEWOOD,
          },
          headerTintColor: Colors.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Philippines" 
          component={Philippines} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="PhilippineStatistics" 
          component={PhilippineStatistics} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="PhilippineCases" 
          component={PhilippineCases} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Countries" 
          component={Countries}
          options={{
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="Country" 
          component={Country} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Information" 
          component={Information} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="News" 
          component={News} 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="GlobalMap" 
          component={GlobalMap} 
        />
        <Stack.Screen 
          name="CountryMap" 
          component={CountryMap} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
