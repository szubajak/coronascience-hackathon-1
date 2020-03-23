import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Linking, Image, StyleSheet } from 'react-native';
import { View, Text, Grid, List, ListItem, Button, Icon, Col, Row } from 'native-base';
import AppStyle, { colors } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { Rect, LinearGradient, Stop } from 'react-native-svg';


interface PropsType {
}

interface State {
}

class FrequentlyAskedQuestions extends Component<PropsType, State> {

  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return (
      <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 50, paddingVertical: 40.}}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'flex-start', height: '100%'}}
              source={require('../assets/img/virus.png')}
            />
          <View style={{flex: 3, flexDirection: 'row', width: '60%', alignItems: 'center'}}>
            <Text style={styles.logoText}>Gemeinsam bekämpfen wir COVID-19!</Text>
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 20}}>
              <Button iconRight rounded style={{margin: 5 }}>

                <Text>Symptome und Informationen erfassen</Text>
                <Icon name='add-circle' />
              </Button>
              <Button iconRight rounded style={{margin: 5, marginVertical: 10 }}>
                <Text>Profilangaben vervollständigen</Text>
                <Icon name='person' />
              </Button>
        </View>
        <View style={{flex: 4}}>
        <ScrollView>
          <List>
            <ListItem>
              <Text>Was ist COVID-19?</Text>
            </ListItem>
            <ListItem>
              <Text>Wie kann ich helfen?</Text>
            </ListItem>
            <ListItem>
              <Text>Wieso ist meine Datenspende so wichtig?</Text>
            </ListItem>
            <ListItem>
              <Text>Welche Daten werden gespeichert?</Text>
            </ListItem>
            <ListItem>
              <Text>Habe ich einen direkten Nutzen?</Text>
            </ListItem>
          </List>
        </ScrollView>
        </View>
      </SafeAreaView>
      </>
    );
  };

}

const styles = StyleSheet.create({
  logoText: {
    flex: 1,
    marginRight: -10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  }
});

export default FrequentlyAskedQuestions;
