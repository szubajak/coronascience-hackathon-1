import * as React from 'react';
import Dashboard from './Dashboard';
import Informations from './Informations';
import Settings from './Settings'
import Profil from './Profil'
import Symptom from './Symptom'
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/App.style';
import SplashScreen from 'react-native-splash-screen'
import { StatusBar, Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const images = {
  'dashboard' : {
    actif : require('../../resources/images/dashboard/actif.png'),
    inactif : require('../../resources/images/dashboard/inactif.png')
  },
  'informations' : {
    actif : require('../../resources/images/informations/actif.png'),
    inactif : require('../../resources/images/informations/inactif.png')
  },
  'symptom' : {
    actif : require('../../resources/images/dashboard/actif.png'),
    inactif : require('../../resources/images/dashboard/inactif.png')
  },
  'settings' : {
    actif : require('../../resources/images/settings/actif.png'),
    inactif : require('../../resources/images/settings/inactif.png')
  },
  'profile' : {
    actif : require('../../resources/images/profile/actif.png'),
    inactif : require('../../resources/images/profile/inactif.png')
  }
};

function generateTabImage(tabId : string, isActive : boolean) {
  const sourceImage = isActive ? images[tabId].actif : images[tabId].inactif;
  return (<Image source={sourceImage} style={styles.menuItemImage}/>);
}

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <Dashboard navigation={navigation} />
  );
}

const styles = StyleSheet.create({
  menuItemImage: {
    marginTop: '4%',
    width: 29,
    height: 29,
    overflow: 'visible'
  }
});

export default function App() {
  SplashScreen.hide(); // TODO: move this in componentDidMount
  return (
    <>
      <StatusBar backgroundColor={colors.headerGradientEnd} barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.secondaryDark,
            inactiveTintColor: 'gray',
            showLabel: false,
            adaptive: true,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                generateTabImage('dashboard', focused)
              )
            }}
          />

          <Tab.Screen
            name="Informations"
            component={Informations}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                generateTabImage('informations', focused)
              )
            }}
          />

          <Tab.Screen
            name="AddSymptoms"
            component={Symptom}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                generateTabImage('symptom', focused)
              )
            }}
          />

          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                generateTabImage('settings', focused)
              )
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profil}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                generateTabImage('profile', focused)
              )
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
