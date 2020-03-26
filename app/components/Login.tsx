import React, { Component, RefObject } from 'react';
import ModalBaseScene from './ModalBaseScene';
import AppStyle, {colors, TextSize} from '../styles/App.style';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'native-base'
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type PropType = {
  isLoginOpen: boolean;
  onClose: ()=>void;
}

class Login extends Component<PropType> {

  render() {
    return (
      <ModalBaseScene
        style={styles.view}
        isVisible={this.props.isLoginOpen}
        onSwipeComplete={this.props.onClose}>
        <View>
          <Svg width='100%' height='250'>
            <Defs>
              <LinearGradient id="linearMain" x1="0" y1="100%" x2="0" y2="0">
                  <Stop offset="0" stopColor={colors.headerGradientBegin}/>
                  <Stop offset="1" stopColor={colors.headerGradientEnd}/>
              </LinearGradient>
            </Defs>
            <Rect x='0' y='0' width='100%' height='100%' fill='url(#linearMain)'/>
          </Svg>
          <View style={styles.viewContainer}>
            <TouchableHighlight onPress={this.props.onClose} style={{left:10, position: "absolute"}}>
                <Icon name='close' color={colors.white} size={25} />
            </TouchableHighlight>
            <Text style={styles.titleText}>
              Identification
            </Text>
            <Text style={styles.mainText}>
              Um die weiteren Funktionen von Corona Science zu nutzen ist eine Registration notwendig.
            </Text>
            <Button style={[AppStyle.button, styles.button]}>
              <Text style={[AppStyle.textButton]}>
                Registration/Login bei MIDATA
              </Text>
            </Button>
          </View>
        </View>
      </ModalBaseScene>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewContainer: {
    padding: 10,
    left:20,
    top: 25,
    position: "absolute"
  },
  titleText: {
    left: 40,
    top: -5,
    position: "absolute",
    fontSize: TextSize.big,
    textAlign: "center",
    color: colors.white,
    width: 300,
  },
  mainText: {
    color: colors.white,
    fontSize: TextSize.normal,
    textAlign: "center",
    width: 375,
    top: 50,
    position: "absolute",
  },
  button:{
    top: 125,
    width: '95%'
  }
});

export default Login;