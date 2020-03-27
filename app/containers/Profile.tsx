import React, { Component, Props } from 'react';
import { ScrollView, Linking, Switch } from 'react-native';
import { View, Text, ListItem, Left, Right, Icon, Button } from 'native-base';
import AppStyle from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import Login from '../components/Login';
import { StackNavigationProp } from '@react-navigation/stack';
import MiDataServiceStore from '../store/midataService/model';
import { AppStore } from '../store/reducers';
import { connect } from 'react-redux';
import * as miDataServiceActions from '../store/midataService/actions';

interface PropsType {
  navigation: StackNavigationProp<any>
  miDataServiceStore: MiDataServiceStore
  logoutUser: () => void
}

interface State {
  isLoginPopupVisible: boolean
  isPreviouslyLogged: boolean;
}

class Profile extends Component<PropsType, State> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      isLoginPopupVisible: true,
      isPreviouslyLogged: props.miDataServiceStore.isAuthenticated(),
    };
    this.props.navigation.addListener('focus', this.onScreenFocus)
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

  onScreenFocus = () => {
    // Screen was focused, our on focus logic goes here
    this.setState({isLoginPopupVisible: true});
  }

  onLoginCancelled() {
    this.setState({isLoginPopupVisible: false});
    //this.props.navigation.navigate('Dashboard');
    this.props.navigation.goBack();
  }

  static getDerivedStateFromProps(props : PropsType, state : State){
    if(state.isPreviouslyLogged && !props.miDataServiceStore.isAuthenticated()){
      props.navigation.navigate('Dashboard');
      state.isLoginPopupVisible = false;
    }
    
    state.isPreviouslyLogged = props.miDataServiceStore.isAuthenticated();
  }

  render() {
    return (
      <>
        {!this.props.miDataServiceStore.isAuthenticated()
        ?
          (<View>
            <Login isLoginOpen={this.state.isLoginPopupVisible} onClose={this.onLoginCancelled.bind(this)}/>
          </View>)
        : (<>
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
                <ListItem noIndent itemDivider={false}>
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

                <Button style={[AppStyle.button]}
                    onPress={this.props.logoutUser}>
                    <Text style={[AppStyle.textButton]}>
                        Logout
                    </Text>
                </Button>
            </ScrollView>
          </>)
        }
      </>
    );
  };
}

function mapStateToProps(state: AppStore) {
  return {
      miDataServiceStore: state.MiDataServiceStore
  };
}

function mapDispatchToProps(dispatch) {
  return {
      authenticateUser: (accessToken: string, accessTokenExpirationDate: string, refreshToken: string) => miDataServiceActions.authenticateUser(dispatch, accessToken, accessTokenExpirationDate, refreshToken),
      logoutUser: () => miDataServiceActions.logoutUser(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
