import React, { Component, Props } from 'react';
import { ScrollView, Linking, Switch } from 'react-native';
import { View, Text, ListItem, Left, Right, Icon, Button } from 'native-base';
import AppStyle, {TextSize} from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import Login from '../components/Login';
import { StackNavigationProp } from '@react-navigation/stack';
import MiDataServiceStore from '../store/midataService/model';
import { AppStore } from '../store/reducers';
import { connect } from 'react-redux';
import * as miDataServiceActions from '../store/midataService/actions';
import * as userProfileActions from '../store/userProfile/actions';
import UserProfile from '../model/UserProfile';
import UserProfileService from '../services/UserProfileService';
import UserName from '../model/UserName';

interface PropsType {
  navigation: StackNavigationProp<any>
  miDataServiceStore: MiDataServiceStore
  userProfile: UserProfile
  logoutUser: () => void
  updateUserProfile: (u: Partial<UserProfile>) => void
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
    this.props.navigation.addListener('focus', this.onScreenFocus);
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
    return state;
  }

  componentDidUpdate(){
    if(this.props.miDataServiceStore.isAuthenticated() && !this.props.userProfile.isUpToDate()) {
      new UserProfileService(this.props.miDataServiceStore).getUserProfile().then((response) => {
        this.props.updateUserProfile(response);
      });
    }
  }

  render() {
    return (
      <>
        {!this.props.miDataServiceStore.isAuthenticated()
        ?
          (<View>
            <Login isLoginOpen={this.state.isLoginPopupVisible} onClose={this.onLoginCancelled.bind(this)}/>
          </View>)
        : ( this.renderUserProfile() )
        }
      </>
    );
  }


  renderUserProfile() {
    return (<>
      {!this.props.userProfile.isUpToDate() ?
          (<>
          <Text>{"Loading..."}</Text>
          <Button style={[AppStyle.button]}
                onPress={this.props.logoutUser}>
                <Text style={[AppStyle.textButton]}>
                    Logout
                </Text>
            </Button></>) :
        (<>
        <HeaderBanner title={this.props.userProfile.getFullName() }/>
          <ScrollView
              style={{height: '100%', paddingHorizontal:'10%', paddingTop: 20}}
              contentInsetAdjustmentBehavior="automatic">
              <View>
                  <Text style={[AppStyle.sectionTitle]}>
                      Persönliche Daten
                  </Text>
              </View>
              <Separator/>
            <ListItem noIndent itemDivider={false} style={{opacity:0}}>
              <Left>
                <Text style={[AppStyle.textQuestion, {fontSize:TextSize.normal}]}>Deutch</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <View style={{height:25}}>

            </View>
            <View style={{opacity:0}}>
                <Text style={[AppStyle.sectionTitle,{marginBottom: 5}]}>
                    Erinnerungen
                </Text>
                <Text style={[AppStyle.textQuestion]}>
                    Erinnerungen werden nur aktiviert, wenn im gewählten Intervall keine Symptome erfasst wurde.
                </Text>
            </View>

            <ListItem noIndent style={{opacity:0}}>
              <Left>
                <Text style={[AppStyle.textQuestion, {fontSize:TextSize.normal}]}>Erinnerungen aktivieren</Text>
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
        </>)}
    </>);
  }
;
}

function mapStateToProps(state: AppStore) {
  return {
      miDataServiceStore: state.MiDataServiceStore,
      userProfile: state.UserProfileService
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
      authenticateUser: (accessToken: string, accessTokenExpirationDate: string, refreshToken: string) => miDataServiceActions.authenticateUser(dispatch, accessToken, accessTokenExpirationDate, refreshToken),
      logoutUser: () => miDataServiceActions.logoutUser(dispatch),
      updateUserProfile: (userProfile: Partial<UserProfile>) => userProfileActions.updateUserProfile(dispatch, userProfile)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
