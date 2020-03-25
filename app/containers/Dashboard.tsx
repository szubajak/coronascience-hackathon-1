import React, { Component } from 'react';
import { SafeAreaView, Image, StyleSheet, FlatList, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { View, Text, ListItem, Icon } from 'native-base';
import AppStyle, { colors, TextSize } from '../styles/App.style';
import LinearGradient from 'react-native-linear-gradient';
import Twitter from './Twitter';

class LargeButton extends Component<{navigation: any, target: string, icon: string, title: string}> {
  smallScreen = Dimensions.get('window').width < 360;
  render() {
    return (
      <>
      <TouchableOpacity activeOpacity = { 0.5 } onPress={() => this.props.navigation.navigate(this.props.target)} style={styles.largeButton}>
        <LinearGradient
            colors={[colors.headerGradientEnd, colors.headerGradientBegin]}
            style={[AppStyle.button, styles.LinearGradientStyle]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0.9}}
            locations={[0, 1]} >
            <Text style={styles.largeButtonText}>{this.props.title}</Text>
            {!this.smallScreen &&
              <Icon name={this.props.icon} style={styles.largeButtonIcon}/>
            }
      </LinearGradient>
      </TouchableOpacity>
      </>
    );
  }
}

class Dashboard extends Component<{navigation: any}> {
  questions = [
                {
                  id: '0',
                  text: "Was ist COVID-19?",
                  link: "",
                  description: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby."
                },
                {
                  id: '1',
                  text: "Wie kann ich helfen?",
                  link: "",
                  description: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby."
                },
                {
                  id: '2',
                  text: "Wieso sind meine Daten so wichtig?",
                  link: "",
                  description: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby."
                },
                {
                  id: '3',
                  text: "Welche Daten werden gespeichert?",
                  link: "",
                  description: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby."
                },
                {
                  id: '4',
                  text: "Habe ich einen direkten Nutzen?",
                  link: "",
                  description: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby."
                }
              ];

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
          <LargeButton title="Symptome erfassen"
                       target="AddSymptoms"
                       icon="add-circle"
                       navigation={this.props.navigation} />
          <LargeButton title="Profilangaben vervollständigen"
                       target="Profile"
                       icon="person"
                       navigation={this.props.navigation} />
        </View>
        {/* <View style={{flex: 3, marginTop: 30}}>
          <FlatList
            data={this.questions}
            renderItem={({ item }) =>
              <ListItem onPress={() => Alert.alert(item.text)}>
                <Text style={styles.listText}>{item.text}</Text>
              </ListItem>}
          />
        </View> */}
        <View style={{flex: 3, marginHorizontal: 20}}>
          <Twitter/>
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
  LinearGradientStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 15,
    borderWidth: 0
  },
  largeButton: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 0.4,
    elevation: 5,
    shadowRadius: 4 ,
    shadowOffset : { width: 5, height: 5},
  },
  largeButtonIcon: {
    color: colors.white
  },
  largeButtonText:{
    marginTop: 3,
    borderWidth: 0,
    marginRight: 0,
    fontSize: TextSize.small,
    color: colors.white,
 }
});

export default Dashboard;
