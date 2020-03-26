import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking, Alert } from 'react-native';
import { View, Button, Text } from 'native-base';
import AppStyle, { colors, AppFonts } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { localeString } from '../locales';
import { authorize } from 'react-native-app-auth';
import MIDATAServiceManager from '../services/MIDATAServiceManager';
import UserProfileService from '../services/UserProfileService';
import SymptomData from '../model/SymptomData';
import SymptomService from '../services/SymptomService';
import Config from 'react-native-config';
import Oberservation, { CodeableConcept, status } from '../model/resource/Observation';
import Observation from '../model/resource/Observation';

interface PropsType {
}

interface State {
        hasLoggedInOnce: boolean,
        accessToken: string,
        accessTokenExpirationDate: string,
        refreshToken: string
}

const config = {
    issuer: Config.HOST + '/fhir',
    clientId: Config.CLIENT_ID,
    redirectUrl: Config.REDIRECT_URL,
    scopes: ['user/*.*'],

    serviceConfiguration: {
        authorizationEndpoint: Config.HOST + Config.AUTHORIZATION_ENDPOINT,
        tokenEndpoint: Config.HOST + Config.TOKEN_ENDPOINT
    }

  };

class Informations extends Component<PropsType, State> {

  constructor(props: PropsType) {
    super(props);
    this.setState({
        hasLoggedInOnce: false,
    });
  }

  async login(){
    // use the client to make the auth request and receive the authState
    try {
        // TODO : add loading ore disable "Login button"
        const newAuthState = await authorize(config); // result includes accessToken, accessTokenExpirationDate and refreshToken
        // TODO : Check is no error happend (valid access token, so on)
        this.setState({
            hasLoggedInOnce: true,
            ...newAuthState
        })
        // TODO : remove loading or re-enable "Login button"
        // Update Auth token for our service manager :
        MIDATAServiceManager.setAuthToken(newAuthState.accessToken, newAuthState.accessTokenExpirationDate, newAuthState.refreshToken);
        // FOR TEST : try to get the userprofile :
        const user = await MIDATAServiceManager.fetch('/fhir/Patient', 'GET');
        const observations = await MIDATAServiceManager.fetch('/fhir/Observation', 'GET');

        let cc = new CodeableConcept();

        let symptom : Observation = new Observation("myId", status.preliminary, cc);
        

        /*
        var user = await new UserProfileService().getUserProfile();
        var symptom = new SymptomData();
        var result = new SymptomService().uploadSymptom(symptom);
        */
        console.log(user);
        console.log(observations);
    } catch (error) {
        console.log("Error while login : " + JSON.stringify(error));
    }
  }


  async logout(){
    // use the client to make the auth request and receive the authState
    try {
        this.setState({
            hasLoggedInOnce: false,
            accessToken: '',
            accessTokenExpirationDate: '',
            refreshToken: '',
        })
        // result includes accessToken, accessTokenExpirationDate and refreshToken
    } catch (error) {
        console.log(error);
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: colors.headerGradientEnd }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <HeaderBanner title='Informationen'/>
            <ScrollView 
                style={{height: '100%', marginLeft:'10%', marginRight:'10%'}}
                contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text style={[AppStyle.sectionTitle]}>
                        Bundesamt für Gesundheit
                    </Text>
                </View>
                <Separator/>
                <View>
                    <Text style={[AppStyle.textQuestion]}>
                        Infoline (täglich 24h): 007
                    </Text>
                    <Button style={[AppStyle.button]}
                        onPress={() => this.login()}>
                        <Text style={[AppStyle.textButton]}>
                            Login
                        </Text>
                    </Button>
                </View>
                
                
            </ScrollView>
        </SafeAreaView>
      </>
    );
  };

}

export default Informations;