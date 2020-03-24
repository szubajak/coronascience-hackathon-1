import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking, Switch } from 'react-native';
import { View, Button, Text, ListItem, Left, Right, Icon } from 'native-base';
import AppStyle, { colors, AppFonts, TextSize } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { localeString } from '../locales';


interface PropsType {
}

interface State {
}

class Profil extends Component<PropsType, State> {

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

  render() {
    return (
      <>
        <StatusBar backgroundColor={colors.headerGradientEnd} barStyle="light-content" />
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
                <ListItem noIndent itemDivider='false'>
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
      </>
    );
  };

}



export default Profil;
