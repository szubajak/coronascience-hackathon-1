import * as React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import {store, persistor} from '../store';
import Login from './Login';
import Dashboard from './Dashboard';
import Informations from './Informations';
import Settings from './Settings'
import Profil from './Profil'
import Symptom from './Symptom'
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/App.style';
import { PersistGate } from 'redux-persist/integration/react';

const Tab = createBottomTabNavigator();

function Root() {
  return (
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
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='home' color={color} size={size} />
            )
          }}
        />

        <Tab.Screen
          name="Informations"
          component={Informations}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='info' color={color} size={size} />
            )
          }}
        />

        <Tab.Screen
          name="AddSymptoms"
          component={Symptom}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='plussquare' color={color} size={size} />
            )
          }}
        />

        <Tab.Screen
          name="Settings"
          
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='setting' color={color} size={size} />
            )
          }}
        >
           {props => <Settings {...props} />}
        </Tab.Screen>

        <Tab.Screen
          name="Profile"
          component={Profil}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name='user' color={color} size={size} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}>
        <Root/>
      </PersistGate>
    </Provider>
  );
}