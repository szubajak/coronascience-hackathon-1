import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Linking, Switch, StyleSheet } from 'react-native';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { View, Button, Text, ListItem, Left, Right, Icon } from 'native-base';
import AppStyle, { colors, TextSize } from '../styles/App.style';
import { Col, Row, Grid } from "react-native-easy-grid";
import { localeString } from '../locales';
import { StackNavigationProp } from '@react-navigation/stack';

interface PropsType {
  navigation: StackNavigationProp<any>
}

interface State {
}

class Settings extends Component<PropsType, State> {

  navigation = this.props.navigation;

  constructor(props: PropsType) {
    super(props);
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

  goToImpressum(){
    this.props.navigation.navigate('Impressum');
  }

  render() {
    return (
        <>
          <HeaderBanner title={localeString('settings.title')}/>
          <ScrollView
            style={{height: '100%', paddingHorizontal:'10%', paddingTop: 20}}
            contentInsetAdjustmentBehavior="automatic">
            <View>
              <Text style={[AppStyle.sectionTitle]}>
                {localeString('settings.userInterface.title')}
              </Text>
            </View>
            <Separator/>
            <ListItem noIndent noBorder>
              <Left>
                <Text style={[AppStyle.textQuestion, {fontSize:TextSize.normal}]}>Deutch</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <View style={{height:25}}>
            </View>
            <View>
                <Text style={[AppStyle.sectionTitle,{marginBottom: 5}]}>
                    {localeString('settings.notifications.title')}
                </Text>
                <Text style={[AppStyle.textQuestion]}>
                  {localeString('settings.notifications.notificationsInformation')}
                </Text>
            </View>

            <ListItem noIndent>
              <Left>
                <Text style={[AppStyle.textQuestion, {fontSize:TextSize.normal}]}>
                  {localeString('settings.notifications.notificationActivation')}
                </Text>
              </Left>
              <Right>
                <Switch/>
              </Right>
            </ListItem>

            <View style={{height:'40%'}}>
            </View>

            <View>
              <Text style={[AppStyle.sectionTitle,{marginBottom: 5}]}>
                {localeString('settings.other.title')}
              </Text>
              <Separator />
              <Grid>
              <Row>
                <Col style={[styles.columns]}>
                  <Button style={[AppStyle.button]}
                    onPress={() => this.goToImpressum()} >
                    <Text style={[AppStyle.textButton]}>
                      {localeString('settings.other.impressum')}
                    </Text>
                  </Button>
                </Col>
                <Col style={[styles.columns]}>
                  <Button style={[AppStyle.button]} onPress={() => this.openURL(localeString('settings.other.termsOfUse.url'))}>
                    <Text style={[AppStyle.textButton]}>{localeString('settings.other.termsOfUse.title')}</Text>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col style={[styles.columns]}>
                  <Button style={[AppStyle.button]} onPress={() => this.openURL(localeString('settings.other.privacyPolicy.url'))}>
                    <Text style={[AppStyle.textButton]}>{localeString('settings.other.privacyPolicy.title')}</Text>
                  </Button>
                </Col>
                <Col style={[styles.columns]}>
                  <Button style={[AppStyle.button]} onPress={() => this.openURL(localeString('settings.other.feedback.url'))}>
                    <Text style={[AppStyle.textButton]}>{localeString('settings.other.feedback.title')}</Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
            </View>
            <Separator />
            <View>
                <Button style={[AppStyle.button, {backgroundColor:colors.secondaryNormal}]} onPress={() => this.openURL('https://www.twint.ch/')}>
                  <Text style={[AppStyle.textButton,{color:colors.white}]}>
                    {localeString('settings.donate')}
                  </Text>
                </Button>
              </View>
          </ScrollView>
        </>

    );
  };
}

const styles = StyleSheet.create({
  columns: {
    marginRight: 8
  },
});

export default Settings;
