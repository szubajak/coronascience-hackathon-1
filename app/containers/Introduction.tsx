import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View, Button, Text } from 'native-base';
import { localeString } from '../locales';
import { colors, AppFonts } from '../styles/App.style';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';


interface PropsType {
}

interface State {
}

declare var global: {HermesInternal: null | {}};

class Introduction extends Component<PropsType, State> {

  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return (
      <>
        <SafeAreaView>
          <View style={{marginBottom: 20}}>
              <Svg width='100%' height='60'>
                  <Defs>
                  <LinearGradient id="linearMain" x1="0" y1="100%" x2="0" y2="0">
                      <Stop offset="0" stopColor={colors.headerGradientBegin}/>
                      <Stop offset="1" stopColor={colors.headerGradientEnd}/>
                  </LinearGradient>
                  </Defs>
                  <Rect x='0' y='0' width='100%' height='100%' fill='url(#linearMain)'/>               
              </Svg>  
          </View>  
        </SafeAreaView>
      </>
    );
  };

}

const styles = StyleSheet.create({
    
  });

  export default Introduction;
