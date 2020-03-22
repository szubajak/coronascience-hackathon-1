import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Dimensions, SafeAreaView, Platform } from 'react-native';
import { View, Button, Text } from 'native-base';

import I18n from '../locales';
import CarouselComponent, { Pagination } from 'react-native-snap-carousel';


import { colors, AppFonts } from '../styles/App.style';
import { INTRODUCTION_PAGES } from '../../resources/static/introduction';
import * as sessionActions from '../store/session/actions';
import * as settingsActions from '../store/settings/actions';
import { connect } from 'react-redux';
import {keys} from '../store/api/config';
import HeaderBar from '../components/HeaderBar';
import IntroductionCarouselItem from '../components/IntroductionCarouseltem';
import { getCurrentLanguage, getDefaultLanguage } from '../locales';
import SplashScreen from 'react-native-splash-screen';

interface PropsType {
  navigation: any;
  rehydrated: boolean;
  createSession: Function;
  initSession: Function;
  resetSettings: Function;
}

interface State {
  activeSlideIndex: number;
  isActive: boolean;
}
const Carousel: any = CarouselComponent;
const Pagination_: any = Pagination;
const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_ITEM_WIDTH = SLIDER_WIDTH * 0.8;

class Introduction extends Component<PropsType, State> {

  slideList: Array<any>;
  focuslistener;
  blurlistener;

  constructor(props: PropsType) {
    super(props);
    this.slideList = this.generateSlideList();
    this.state = {
      activeSlideIndex: 0,
      isActive: true
    };

    this.onSnapItem = this.onSnapItem.bind(this);
    this.renderCarouselItem = this.renderCarouselItem.bind(this);
    this.onPageFocus = this.onPageFocus.bind(this);
    this.onPageBlur = this.onPageBlur.bind(this);
  }

  onPageFocus() {
      this.setState({
        isActive: true
      });
  }

  onPageBlur() {
    this.setState({
      isActive: false,
      activeSlideIndex: 0
    });
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.focuslistener.remove();
    this.blurlistener.remove();
  }

  componentDidMount() {
    this.focuslistener = this.props.navigation.addListener(
      'didBlur',
      this.onPageBlur
    );
    this.blurlistener = this.props.navigation.addListener(
      'willFocus',
      this.onPageFocus
    );
    if (this.props.rehydrated) {

      // DEV HACK TO GO TO PRIVATE WITHOUT TOKENS
      // this.props.navigation.navigate('Tabs');

      // First Launch check
      AsyncStorage.getItem(keys.STORAGE_FIRSTLAUNCH_KEY)
      .then( value => {
        if ( value === null ) {

          AsyncStorage.setItem(keys.STORAGE_FIRSTLAUNCH_KEY, 'true')
          .catch(error => {
            throw error;
          });
          // Rest app secure storage :
          this.props.initSession();
          this.props.resetSettings();
        }
      }).catch(_error => {
        console.warn(_error);
      });

    this.navigateToLogin();

    } else {
      // Impossible according to the redux persist doc
      throw Error('persist is not rehydrating correctly');
    }
  }

  navigateToLogin() {
    this.props.createSession()
    .then(() => {
      this.props.navigation.navigate('Tabs');
    })
    .catch((_e) => {
      SplashScreen.hide();
    });
  }

  onPressLogin() {
    this.props.navigation.navigate('Login');
  }

  generateSlideList(): Array<any> {
    let list = [];
    for (let i = 0; i < INTRODUCTION_PAGES.length; i++) {
      const duration = INTRODUCTION_PAGES[i].duration;
      const localizedSvg = INTRODUCTION_PAGES[i].svg[getCurrentLanguage()];
      list.push({
        duration,
        svg : localizedSvg ? localizedSvg : INTRODUCTION_PAGES[i].svg[getDefaultLanguage()],
        startAnimation: (i === 0) ? true : false,
        startValue: INTRODUCTION_PAGES[i].startValue
      });
    }
    return list;
  }

  renderPagination() {
      const { activeSlideIndex } = this.state;
      return (
          <Pagination_
            containerStyle={{paddingVertical:20, bottom:15}}
            dotsLength={this.slideList.length}
            activeDotIndex={activeSlideIndex}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: colors.primaryActive
            }}
            inactiveDotStyle={{
              backgroundColor: colors.primaryNormal
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
      );
  }

  renderCarouselItem ({item, index}) {
    return <View style={styles.slideInnerContainer}>
              <View style={styles.shadow} />
              <View style={styles.slideItem}>
                <IntroductionCarouselItem
                  ref={r => this.slideList[index].ref = r}
                  duration={item.duration}
                  startValue={item.startValue}
                  startAnimation={item.startAnimation}
                  lottieSrc={item.svg}/>
              </View>
          </View>;
  }

  onSnapItem(index) {
    this.setState({ activeSlideIndex: index });
    for (let i = 0; i < this.slideList.length; i++) {
      if (i === index) {
        this.slideList[i].ref.startAnimation();
      } else
        this.slideList[i].ref.pauseAnimation();
    }

  }

  render() {
      return (
        <SafeAreaView style={{backgroundColor: colors.primaryNormal, flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0}}>
          <View style={styles.container}>
              <HeaderBar titleStyle={styles.headerTitle}
                  headerTitle={I18n.t('intro.title')} withSafeArea={false}/>
              <View style={{backgroundColor: colors.lightGray, height: '87%', marginBottom: -30}}>
              { this.state.isActive && <Carousel
                containerCustomStyle={styles.carousel} 
                data={this.slideList}
                lockScrollWhileSnapping={true}
                removeClippedSubviews={false}
                onSnapToItem={this.onSnapItem}
                renderItem={this.renderCarouselItem}
                layout={'default'}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={SLIDER_ITEM_WIDTH} />}
                { this.renderPagination() }
              <Button
                style={styles.button}
                onPress={() => this.onPressLogin()}>
                <Text style={styles.loginButtonText}>
                  {I18n.t('intro.login')}
                </Text>
              </Button>
              </View>
          </View>
          </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0
  },
  headerTitle: {
    textAlign: 'center',
    flex: 1
  },
  carousel: {
    backgroundColor: colors.lightGray,
    paddingTop: 20,
    paddingBottom: 10
  },
  button: {
      bottom: 15,
      width: 300,
      height: 60,
      alignSelf: 'center',
      backgroundColor: colors.primaryNormal,
      alignItems: 'center',
      justifyContent: 'center'
  },
  loginButtonText: {
      fontFamily: AppFonts.normal,
      fontSize: 18
  },
  slideInnerContainer: {
    width: SLIDER_ITEM_WIDTH,
    flex: 1,
    paddingBottom: 18// needed for shadow
  },
  shadow: {
      position: 'absolute',
      width: '100%',
      elevation: 0,
      top: 0,
      bottom: 18,
      shadowColor: colors.black,
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      borderRadius: 5
  },
  slideItem: {
      width: '100%',
      flex: 1,
      backgroundColor: colors.white,
      borderRadius: 5
  }
});

// Link store data to component :
function mapStateToProps(state) {
  return {
    api: state.api,
    rehydrated: state._persist.rehydrated
  };
}

// Allow actions function from the props :
function mapDispatchToProps(dispatch) {
  return {
    createSession: () => sessionActions.tryToLogin(dispatch),
    initSession: () => sessionActions.init(dispatch),
    resetSettings: () => settingsActions.resetSettings(dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);
