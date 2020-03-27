import React, { Component } from 'react';
import { SafeAreaView, Image, StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { View, Text, Icon, Card, CardItem, Body } from 'native-base';
import AppStyle, { colors, TextSize } from '../styles/App.style';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { localeString } from '../locales';

const SMALLSCREEN_CUTOFF = 360;

interface PropsType {
  navigation: StackNavigationProp<any>
}

interface State {
}

class Dashboard extends Component<{navigation: any}> {
  userCard: React.RefObject<unknown>;
  dataCard: React.RefObject<unknown>;

  navigation = this.props.navigation;

  constructor(props: {navigation: any}) {
    super(props);
    this.userCard = React.createRef();
    this.dataCard = React.createRef();
    // this.userCard.current.setState(123);

    // status bar stuff that only matters on android
    if (Platform.OS === 'android') {
      // when we change to homescreen, we have to use the light gray statusbar
      this.props.navigation.addListener('focus', () => {
        StatusBar.setBackgroundColor(colors.lightGray);
        StatusBar.setBarStyle('dark-content');
      });
      // when we change to another screen, we have to use the dark purple statusbar
      this.props.navigation.addListener('blur', () => {
        StatusBar.setBackgroundColor(colors.headerGradientEnd);
        StatusBar.setBarStyle('light-content');
      });
    }
  }

  render() {
    return (
      <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightGray}}>
        <View style={{flex: 0.8, flexDirection: 'row', paddingHorizontal: 50, paddingVertical: 15}}>
            <Image
              style={{flex: 1, resizeMode: 'contain', alignSelf: 'flex-start', height: '100%'}}
              source={require('../../resources/images/virus.png')}
            />
          <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.logoText}>{localeString('dashboard.slogan')}</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <LargeButton title="Gesundheitszustand erfassen"
                       target="AddSymptoms"
                       icon="add-circle"
                       navigation={this.props.navigation} />
          <LargeButton title="Profilangaben vervollständigen"
                       target="Profile"
                       icon="person"
                       navigation={this.props.navigation} />
        </View>
        <View style={{flex: 2, marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
          <InfoCard item={{text: 'Nutzerinnen und Nutzer', icon: 'people', count: 174}}/>
          <InfoCard item={{text: 'gespendete Datensätze', icon: 'gift', count: 1901}} />
        </View>
      </SafeAreaView>
      </>
    );
  };
}

/**
 * Component to display a prominent button with color gradient, used to navigate to another tab
 * @param: navigation the Tab.Navigator object
 * @param: target the name of the tab the button should navigate to
 * @param: icon the name of the icon to be used in the button (only if screen is big enough) - should be from the ionicons set from https://oblador.github.io/react-native-vector-icons/
 * @param: title the text displayed on the button
 **/
class LargeButton extends Component<{navigation: any, target: string, icon: string, title: string}> {
  smallScreen = Dimensions.get('window').width < SMALLSCREEN_CUTOFF;
  render() {
    return (
      <>
      <TouchableOpacity activeOpacity = { 0.5 } onPress={() => this.props.navigation.navigate(this.props.target)} style={styles.largeButton}>
        <LinearGradient
            colors={[colors.headerGradientEnd, colors.headerGradientBegin]}
            style={[AppStyle.button, styles.linearGradient]}
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

/**
 * Component to display a numerical value with a description text and an icon
 **/
class InfoCard extends Component<{item: {text: string, icon: string, count: number}}> {
  smallScreen = Dimensions.get('window').width < SMALLSCREEN_CUTOFF;
  constructor(props: {item: {text: string, icon: string, count: number}}) {
      super(props);
      this.state = { numberText: '...'};
      let i = props.item.count;

      setInterval(() => {
      this.setState(() => {
        i = Math.floor(i + Math.random() * 10)
        return { numberText: this.numberToString(i)  };
      });
    },
    5000 * (Math.random()));
  }

  /**
   * Formats the number to a string with apostroph every three digits
   **/
  private numberToString(number: number) {
    let numberString = number.toString();
    for(let i = numberString.length - 3; i > 0; i = i - 3){
      let lastpart = numberString.substring(i, numberString.length);
      let firstpart = numberString.substring(0,i);
      numberString = firstpart + '\'' + lastpart;
    }
    return numberString;
  }

  render () {
    return (
      <>
        <Card style={styles.infoCard}>
          <CardItem>
            <Body>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {!(this.smallScreen && this.state.numberText.length > 3) &&
                  <View style={styles.infoCardIconBackground}>
                    <Icon name={this.props.item.icon} style={styles.infoCardIcon} />
                  </View>
                }
                <Text style={styles.infoCardNumber}>{this.state.numberText}</Text>
              </View>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text style={styles.infoCardText}>{this.props.item.text}</Text>
          </CardItem>
        </Card>
      </>
    );
  }
}

const styles = StyleSheet.create({
  logoText: {
    marginRight: -10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },

  linearGradient: {
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
  },

  infoCard: {
    width: '48%',
    height: 100
  },
  infoCardIcon: {
    width: 1.2 * TextSize.very_big,
    height: 1.2 * TextSize.very_big,
    marginLeft: 0.25 * TextSize.very_big,
    marginTop: 0.2 * TextSize.very_big,
    color: colors.headerGradientBegin,
  },
  infoCardIconBackground: {
    alignContent: 'center',
    width: 1.4 * TextSize.very_big,
    height: 1.4 * TextSize.very_big,
    borderRadius: 0.7 * TextSize.very_big,
    backgroundColor: colors.lightGray
  },
  infoCardNumber: {
    flex: 1,
    textAlign: 'right',
    marginTop: 0.15 * TextSize.very_big,
    color: colors.headerGradientBegin,
    fontSize: TextSize.very_big
  },
  infoCardText: {
    fontWeight: 'normal',
    fontSize: TextSize.very_small,
  }
});

export default Dashboard;
