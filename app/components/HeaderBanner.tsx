import * as React from 'react';
import {View, Button} from "native-base";
import {StyleSheet} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop, Text} from 'react-native-svg';
import {colors, AppFonts, TextSize} from '../styles/App.style';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface PropsType {
    title: string;
}

export const HeaderBanner: React.FunctionComponent<PropsType> = ({ title }) =>
    <View style={{marginBottom: 20}}>
            <Svg width='100%' height='60'>
                <Defs>
                <LinearGradient id="linearMain" x1="0" y1="100%" x2="0" y2="0">
                    <Stop offset="0" stopColor={colors.headerGradientBegin}/>
                    <Stop offset="1" stopColor={colors.headerGradientEnd}/>
                </LinearGradient>
                </Defs>
                <Rect x='0' y='0' width='100%' height='100%' fill='url(#linearMain)'/>
                <Text
                    x="50%" y="60%"
                    fill="white"
                    fontSize={TextSize.big}
                    textAnchor="middle">
                        {title}
                </Text>                
            </Svg>  
    </View>  
    ;