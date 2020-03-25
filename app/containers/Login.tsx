import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking, Alert } from 'react-native';
import { View, Button, Text } from 'native-base';
import AppStyle, { colors, AppFonts } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { localeString } from '../locales';
import { authorize } from 'react-native-app-auth';
import MiDataServiceManager from '../services/MiDataServiceManager';
import UserProfileService from '../services/UserProfileService';

interface PropsType {
}

interface State {
        hasLoggedInOnce: boolean,
        accessToken: string,
        accessTokenExpirationDate: string,
        refreshToken: string
}

const config = {
    issuer: 'https://test.midata.coop/fhir',
    clientId: 'corona-science',
    redirectUrl: 'corona.science:/oauthredirect',
    scopes: ['A'],

    serviceConfiguration: {
        authorizationEndpoint: 'https://test.midata.coop/authservice',
        tokenEndpoint: 'https://test.midata.coop/v1/token',
    //   revocationEndpoint: 'https://demo.identityserver.io/connect/revoke'
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
        this.setState({
            hasLoggedInOnce: true,
            ...newAuthState
        })
        // TODO : remove loading or re-enable "Login button"
        // Update Auth token for our service manager :
        MiDataServiceManager.setAuthToken(newAuthState.accessToken, newAuthState.accessTokenExpirationDate, newAuthState.refreshToken);
        // FOR TEST : try to get the userprofile :
        var user = await new UserProfileService().getUserProfile();
        console.log(user);
    } catch (error) {
        console.log("Error while login : " + JSON.stringify(error));
    }
  }


  async logout(){
    // use the client to make the auth request and receive the authState
    try {
        const newAuthState = await authorize(config);
        this.setState({
            hasLoggedInOnce: false,
            ...newAuthState
        })
        console.log(newAuthState);
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