import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking, Alert } from 'react-native';
import { View, Button, Text } from 'native-base';
import AppStyle, { colors, AppFonts } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { localeString } from '../locales';
import { authorize } from 'react-native-app-auth';
import MiDataServiceStore from '../store/midataService/model';
import * as miDataServiceActions from '../store/midataService/actions';
import Config from 'react-native-config';
import Oberservation, { CodeableConcept, status } from '../model/resource/Observation';
import Observation from '../model/resource/Observation';
import { AppStore } from '../store/reducers';
import { connect } from 'react-redux';
import UserSession from '../model/UserSession';

interface PropsType {
    miDataServiceStore: MiDataServiceStore
    authenticateUser: (accessToken: string, accessTokenExpirationDate: string, refreshToken: string) => void
    logoutUser: () => void
}

interface State {
        hasLoggedInOnce: boolean
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

class Login extends Component<PropsType, State> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
        hasLoggedInOnce: false,
    };
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
        this.props.authenticateUser(newAuthState.accessToken, newAuthState.accessTokenExpirationDate, newAuthState.refreshToken);
        // FOR TEST : try to get the userprofile :
        const user = await this.props.miDataServiceStore.fetch('/fhir/Patient', 'GET');
        const observations = await this.props.miDataServiceStore.fetch('/fhir/Observation', 'GET');

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
            hasLoggedInOnce: false
        })
        this.props.logoutUser();
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

function mapStateToProps(state: AppStore) {
    return {
        miDataServiceStore: state.MiDataServiceStore
    };
}

function mapDispatchToProps(dispatch) {
    return {
        authenticateUser: (accessToken: string, accessTokenExpirationDate: string, refreshToken: string) => miDataServiceActions.authenticateUser(dispatch, accessToken, accessTokenExpirationDate, refreshToken),
        logoutUser: () => miDataServiceActions.logoutUser(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);