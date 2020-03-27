import * as React from 'react';
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux';
import {store, persistor} from '../store';
import Impressum from './Impressum';
import Dashboard from './Dashboard';
import Informations from './Informations';
import Settings from './Settings'
import Profile from './Profile'
import Symptom from './Symptom'
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../styles/App.style';
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='user' color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
    </>
  );
}

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
