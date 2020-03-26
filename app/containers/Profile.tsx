import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Linking, Switch } from 'react-native';
import { View, Text, ListItem, Left, Right, Icon } from 'native-base';
import AppStyle, { colors, AppFonts, TextSize } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import ModalBaseScene from '../components/ModalBaseScene'
import { localeString } from '../locales';
import Login from '../components/Login';
import { StackNavigationProp } from '@react-navigation/stack';
import { throwStatement } from '@babel/types';

interface PropsType {
  navigation: StackNavigationProp<any>
}

interface State {
  isLogged?: boolean,
  isLoginPopupVisible: boolean
}

class Profile extends Component<PropsType, State> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      isLogged: true,
      isLoginPopupVisible: true
    };
    this.props.navigation.addListener('focus', this.onScreenFocus)
  }

  openURL( _url : string){
    Linking.canOpenURL(_url).then(supported => {
        if (supported) {
          Linking.openURL(_url);
        } else {
          console.log("Don't know how to open URI: " + _url);
        }
      });
  }
  onScreenFocus = () => {
    // Screen was focused, our on focus logic goes here
    this.setState({isLoginPopupVisible: true});
  }

  onLoginCancelled() {
    this.setState({isLoginPopupVisible: false});
    this.props.navigation.goBack();
  }

  render() {
    return (
      <>
        {!this.state.isLogged
        ?
          (<View>
            <Login isLoginOpen={this.state.isLoginPopupVisible} onClose={this.onLoginCancelled.bind(this)}/>
          </View>)
        : (<>
          <SafeAreaView style={{ flex: 0, backgroundColor: colors.headerGradientEnd }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <HeaderBanner title='Lea Meier'/>
            <ScrollView
                style={{height: '100%', marginLeft:'10%', marginRight:'10%'}}
                contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text style={[AppStyle.sectionTitle]}>
                        Persönliche Daten
                    </Text>
                </View>
                <Separator/>
                <ListItem noIndent itemDivider={false}>
                  <Left>
                    <Text>Deutch</Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                <View style={{height:25}}>

                </View>
                <View>
                    <Text style={[AppStyle.sectionTitle,{marginBottom: 5}]}>
                        Erinnerungen
                    </Text>
                    <Text style={[AppStyle.textQuestion]}>
                        Erinnerungen werden nur aktiviert, wenn im gewählten Intervall keine Symptome erfasst wurde.
                    </Text>
                </View>

                <ListItem noIndent>
                  <Left>
                    <Text>Erinnerungen aktivieren</Text>
                  </Left>
                  <Right>
                    <Switch/>
                  </Right>
                </ListItem>
                <View style={{height:25}}></View>
            </ScrollView>
          </SafeAreaView>
          </>)
        }
      </>
    );
  };

}

export default Profile;
