import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking } from 'react-native';
import { View, Button, Text } from 'native-base';
import AppStyle, { colors, AppFonts } from '../styles/App.style';
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
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
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
                
            </ScrollView>
        </SafeAreaView>
      </>
    );
  };

}



export default Profil;
