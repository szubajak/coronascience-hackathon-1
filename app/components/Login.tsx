import React, { Component, RefObject } from 'react';
import ModalBaseScene from './ModalBaseScene';
import AppStyle, {colors, TextSize} from '../styles/App.style';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base'
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { authorize } from 'react-native-app-auth';
import Config from 'react-native-config';
import { StackNavigationProp } from '@react-navigation/stack';
import MiDataServiceStore from '../store/midataService/model';
import * as miDataServiceActions from '../store/midataService/actions';
import { AppStore } from '../store/reducers';
import { connect } from 'react-redux';
import { localeString } from '../locales';

type PropType = {
  isLoginOpen: boolean;
  onClose: ()=>void;
  navigation: StackNavigationProp<any>
  miDataServiceStore: MiDataServiceStore
  authenticateUser: (accessToken: string, accessTokenExpirationDate: string, refreshToken: string) => void
  logoutUser: () => void
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

class Login extends Component<PropType> {

  async login(){
    // use the client to make the auth request and receive the authState
    try {
        // TODO : add loading ore disable "Login button"
        const newAuthState = await authorize(config); // result includes accessToken, accessTokenExpirationDate and refreshToken
        // TODO : Check is no error happend (valid access token, so on)
        // TODO : remove loading or re-enable "Login button"
        this.props.authenticateUser(newAuthState.accessToken, newAuthState.accessTokenExpirationDate, newAuthState.refreshToken);
    } catch (error) {
        console.log("Error while login : " + JSON.stringify(error));
    }
  }

  render() {
    return (
      <ModalBaseScene
        style={styles.view}
        isVisible={this.props.isLoginOpen}
        onSwipeComplete={this.props.onClose}>
        <View>
          <Svg width='100%' height='250'>
            <Defs>
              <LinearGradient id="linearMain" x1="0" y1="100%" x2="0" y2="0">
                  <Stop offset="0" stopColor={colors.headerGradientBegin}/>
                  <Stop offset="1" stopColor={colors.headerGradientEnd}/>
              </LinearGradient>
            </Defs>
            <Rect x='0' y='0' width='100%' height='100%' fill='url(#linearMain)'/>
          </Svg>
          <View style={styles.viewContainer}>
            <TouchableHighlight onPress={this.props.onClose} style={{left:10, position: "absolute"}}>
                <Icon name='close' color={colors.white} size={25} />
            </TouchableHighlight>
            <Text style={styles.titleText}>
              {localeString('login.title')}
            </Text>
            <Text style={styles.mainText}>
              {localeString('login.texte')}
            </Text>
            <Button style={[AppStyle.button, styles.button]} onPress={this.login.bind(this)}>
              <Text style={[AppStyle.textButton]}>
                {localeString('login.loginButton')}
              </Text>
            </Button>
          </View>
        </View>
      </ModalBaseScene>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewContainer: {
    padding: 10,
    left:20,
    top: 25,
    position: "absolute"
  },
  titleText: {
    left: 40,
    top: -5,
    position: "absolute",
    fontSize: TextSize.big,
    textAlign: "center",
    color: colors.white,
    width: '80%'
  },
  mainText: {
    color: colors.white,
    fontSize: TextSize.normal,
    textAlign: "center",
    width: '95%',
    top: 50,
    position: "absolute",
  },
  button:{
    top: 125,
    width: '95%'
  }
});

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