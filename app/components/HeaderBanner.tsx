import * as React from 'react';
import {View} from "native-base";
import {TouchableHighlight} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop, Text} from 'react-native-svg';
import {colors, TextSize} from '../styles/App.style';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface PropsType {
    title: string;
    btnClose?: boolean;
    onClose?: ()=>void;
}

export const HeaderBanner: React.FunctionComponent<PropsType> = ({ title, btnClose = false, onClose }) =>
    <View>
            <Svg width='100%' height='60'>
                <Defs>
                <LinearGradient id="linearMain" x1="0" y1="100%" x2="0" y2="0">
                    <Stop offset="0" stopColor={colors.headerGradientBegin}/>
                    <Stop offset="1" stopColor={colors.headerGradientEnd}/>
                </LinearGradient>
                </Defs>
                <Rect x='0' y='0' width='100%' height='100%' fill='url(#linearMain)'/>
                <Text z-index="10"
                    x="50%" y="60%"
                    fill={colors.white}
                    fontSize={TextSize.big}
                    textAnchor="middle">
                        {title}
                </Text>
            </Svg>
            {btnClose && <TouchableHighlight onPress={onClose} style={{left:20, top: "50%", position: "absolute"}}>
                <Icon name='close' color={colors.white} size={25} style={{left:20, top: "-50%"}} />
            </TouchableHighlight> }
    </View>
    ;
