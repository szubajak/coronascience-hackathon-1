import * as React from 'react';
import { Text, View } from 'react-native';
import Login from './Login';
import Introduction from './Introduction';
import Informations from './Informations';
import Settings from './Settings'
import Profil from './Profil'
import Symptom from './Symptom'
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/App.style';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Stay @ home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <Introduction/>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
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
          name="Home"
          component={Login}
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
          name="AddSympome"
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
          name="Profil"
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