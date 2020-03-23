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

class Informations extends Component<PropsType, State> {

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
                    <Text>
                        Infoline (täglich 24h): <Text onPress={() => this.openURL('tel:0041584630000')}>+41 58 463 00 00</Text>
                    </Text>
                    
                    <Button style={[AppStyle.button]}
                        onPress={() => this.openURL('https://i4mi.bfh.ch')}>
                        <Text style={[AppStyle.textButton]}>
                            Website BAG: Neues Coronavirus
                        </Text>
                    </Button>
                    <Button style={[AppStyle.button]}
                        onPress={() => this.openURL('https://ti.bfh.ch')}>
                        <Text style={[AppStyle.textButton]}>
                            Website BAG: Massnahmen des Bundes
                        </Text>
                    </Button>
                    <Button style={[AppStyle.button]}
                        onPress={() => this.openURL('https://bfh.ch')}>
                        <Text style={[AppStyle.textButton]}>
                            Website BAG: Kontakinforamtionen
                        </Text>
                    </Button>
                    <Button style={[AppStyle.button]}
                        onPress={() => this.openURL('https://ti.bfh.ch')}>
                        <Text style={[AppStyle.textButton]}>
                            Informationen und Kontakte in den Kantonen
                        </Text>
                    </Button>
                    <Button style={[AppStyle.button]}
                        onPress={() => this.openURL('https://bfh.ch')}>
                        <Text style={[AppStyle.textButton]}>
                            Coronavirus-Check des BAG
                        </Text>
                    </Button>
                </View>
                
                <View>
                    <Text style={[AppStyle.sectionTitle]}>
                        Aertefon
                    </Text>
                </View>
                <Separator/>
                <View>
                    <Text>
                        Infoline (täglich 24h): 0800 33 66 55
                    </Text>
                    <Button style={[AppStyle.button]}
                        onPress={() => this.openURL('https://i4mi.bfh.ch')}>
                        <Text style={[AppStyle.textButton]}>
                            Website Aerztefon
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
