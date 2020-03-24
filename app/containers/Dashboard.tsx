import React, { Component } from 'react';
import { SafeAreaView, Image, StyleSheet, FlatList, Alert, StatusBar, TouchableOpacity } from 'react-native';
import { View, Text, ListItem, Button, Icon } from 'native-base';
import AppStyle, { colors, AppFonts, TextSize } from '../styles/App.style';
import LinearGradient from 'react-native-linear-gradient';

interface PropsType {
  navigation: any
}

interface State {
}

class Dashboard extends Component<PropsType, State> {
  questions = [{
                id: 0,
                text: "Was ist COVID-19?",
                link: ""
              },
              {
                id: 1,
                text: "Wie kann ich helfen?",
                link: ""
              },
              {
                id: 2,
                text: "Wieso sind meine Daten so wichtig?",
                link: ""
              },
              {
                id: 3,
                text: "Welche Daten werden gespeichert?",
                link: ""
              },
              {
                id: 4,
                text: "Habe ich einen direkten Nutzen?",
                link: ""
              }];

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
              source={require('../../resources/images/virus.png')}
            />
          <View style={{flex: 3, flexDirection: 'row', width: '60%', alignItems: 'center'}}>
            <Text style={styles.logoText}>Gemeinsam bekämpfen wir COVID-19!</Text>
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 20}}>
          <Button iconRight rounded
            style={styles.prominentButton}
            onPress={() => this.props.navigation.navigate('AddSymptoms')}>
            <Text>Symptome und Informationen erfassen</Text>
            <Icon name='add-circle' />
          </Button>

          <TouchableOpacity activeOpacity = { .5 } >
            <LinearGradient 
                colors={[colors.headerGradientBegin, colors.headerGradientEnd]}
                style={[AppStyle.button, {borderRadius: 25}]}  
                start={{x: 0, y: 1}} 
                end={{x: 1, y: 0.9}}
                locations={[0, 0.3, 0.9]} >
                <Text style={[styles.largeButtonText]}>Profilangaben vervollständigen</Text>
                <Icon name='person' />   
          </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{flex: 4, marginTop: 30}}>
          <FlatList
            data={this.questions}
            renderItem={({ item }) =>
              <ListItem onPress={() => Alert.alert(item.text)}>
                <Text style={styles.listText}>{item.text}</Text>
              </ListItem>}
          />
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
  },
  listText: {
    color: colors.secondaryNormal,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  prominentButton: {
    margin: 5,
    marginBottom: 10,
    backgroundColor: colors.secondaryNormal
  },
  LinearGradientStyle: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginBottom: 20
  },
 
  buttonText: {
   fontSize: 18,
   textAlign: 'center',
   margin: 7,
   color : '#fff',
   backgroundColor: 'transparent' 
 },

 largeButtonText:{
  fontSize: TextSize.small,
  color: colors.white,

 }
});

export default Dashboard;
