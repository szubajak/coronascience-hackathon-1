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
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <Dashboard navigation={navigation} />
  );
}

export default function App() {
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
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name='setting' color={color} size={size} />
              )
            }}
          />

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
    </>
  );
}
