import * as React from 'react';
import { SafeAreaView, Image, StyleSheet } from 'react-native'
import { Provider } from 'react-redux';
import {store, persistor} from '../store';
import Impressum from './Impressum';
import Dashboard from './Dashboard';
import Informations from './Informations';
import Settings from './Settings'
import Profile from './Profile'
import Symptom from './Symptom'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/App.style';
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const images : any = {
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

function Root() {
  return (
    <>
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.secondaryDark,
        inactiveTintColor: 'gray',
        showLabel: false,
        adaptive: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
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
        
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            generateTabImage('settings', focused)
          )
        }}
      >
          {props => <Settings {...props} />}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            generateTabImage('profile', focused)
          )
        }}
      />
    </Tab.Navigator>
    </>
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
  return (
    <>
      <Provider store={store}>
        <PersistGate
          persistor={persistor}>
           <NavigationContainer>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.headerGradientEnd }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
              <RootStack.Navigator mode="modal">
                <RootStack.Screen
                  name="Main"
                  component={Root}
                  options={{ headerShown: false }}
                />
                <RootStack.Screen 
                  name="Impressum" 
                  component={Impressum} 
                  options={{ headerShown: false }} // TODO: fix header layout bug "...TransitionPresets.DefaultTransition"
                />
              </RootStack.Navigator>
            </SafeAreaView>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}
