import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Linking } from 'react-native';
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
        <HeaderBanner title={localeString('informations.title')}/>
        <ScrollView
            style={{height: '100%', marginLeft:'10%', marginRight:'10%'}}
            contentInsetAdjustmentBehavior="automatic">
            <View>
                <Text style={[AppStyle.sectionTitle]}>
                    {localeString('informations.authorityName')}
                </Text>
            </View>
            <Separator/>
            <View>
                <Text style={[AppStyle.textQuestion]}>
                    {localeString('informations.infoLine')}: <Text onPress={() => this.openURL('tel:' + localeString('informations.authorityInfolineNumber').replace(/\s/g, ""))}>{localeString('informations.authorityInfolineNumber')}</Text>
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
            
            <View style={{marginTop:25}}>
                <Text style={[AppStyle.sectionTitle]}>
                    {localeString('informations.serviceName')}
                </Text>
            </View>
            <Separator/>
            <View>
                <Text style={[AppStyle.textQuestion]}>
                {localeString('informations.infoLine')}: <Text onPress={() => this.openURL('tel:' + localeString('informations.serviceInfoLineNumber').replace(/\s/g, ""))}>{localeString('informations.serviceInfoLineNumber')}</Text>
                </Text>
                <Button style={[AppStyle.button]}
                    onPress={() => this.openURL(localeString('informations.serviceInternetSiteURL'))}>
                    <Text style={[AppStyle.textButton]}>
                        {localeString('informations.serviceInternetSiteName')}
                    </Text>
                </Button>
            </View>
        </ScrollView>
      </>
    );
  };

}



export default Informations;
