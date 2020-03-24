import React, { Component } from 'react';
import { SafeAreaView, Image, StyleSheet, FlatList } from 'react-native';
import { View, Text, ListItem, Button, Icon } from 'native-base';
import { colors } from '../styles/App.style';


interface PropsType {
  nav: any
}

interface State {
}

class FrequentlyAskedQuestions extends Component<PropsType, State> {
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
              source={require('../assets/img/virus.png')}
            />
          <View style={{flex: 3, flexDirection: 'row', width: '60%', alignItems: 'center'}}>
            <Text style={styles.logoText}>Gemeinsam bekämpfen wir COVID-19!</Text>
          </View>
        </View>
        <View style={{flex: 1, marginHorizontal: 20}}>
              <Button iconRight rounded
                style={styles.prominentButton}
                onPress={() => this.props.nav.navigate('AddSymptoms')}>
                <Text>Symptome und Informationen erfassen</Text>
                <Icon name='add-circle' />
              </Button>
              <Button iconRight rounded
                style={styles.prominentButton}
                onPress={() => this.props.nav.navigate('Profile')}>
                <Text>Profilangaben vervollständigen</Text>
                <Icon name='person' />
              </Button>
        </View>
        <View style={{flex: 4, marginTop: 30}}>
          <FlatList
            data={this.questions}
            renderItem={({ item }) =>
              <ListItem onPress={() => alert(item.text)}>
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
  }
});

export default FrequentlyAskedQuestions;
