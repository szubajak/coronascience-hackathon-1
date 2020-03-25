import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import {Container, View, Spinner } from 'native-base';
import {colors} from '../styles/App.style';
import Svg, { G, Path } from 'react-native-svg';

const Splash = () => (
    <Container>
        <View style={styles.splashContainer}>
            <Svg style= {styles.splashSvg} width={Dimensions.get('window').width} height={Dimensions.get('window').height} viewBox='0 0 24 24'>
                <G fill='#4BB164' fill-rule='evenodd' transform='scale(1.5) translate(-2 -4.5)'>
                    <Path d={'M2.84787391 14.4705522C2.04896087 14.0322913.64196087 15.0622043.2037' +
                             ' 15.8602043-.23456087 16.6582043.0576130435 17.6616391.855613043 18.0999' +
                             ' 1.65452609 18.5381609 2.65704783 18.245987 3.0953087 17.4470739 3.53356957' +
                             ' 16.6490739 3.64678696 14.908813 2.84787391 14.4705522M19.8489261 15.8387478C19.3111435' +
                             ' 14.8709217 12.4578391 2.58044348 12.4578391 2.58044348 11.0444478.214747826' +
                             ' 8.38383913.468573913 7.36488261 2.6964 7.03983913 3.40674783 4.71431739 9.00187826' +
                             ' 4.23679565 10.1660087 3.58488261 11.7592696 5.07862174 12.4495304 6.11675217 11.599487' +
                             ' 6.75588261 11.0772261 7.63879565 10.0957043 8.88783913 8.91513913 9.33523043 8.4924' +
                             ' 9.87757826 8.40748696 10.3569261 9.04661739 10.6600565 9.44926957 11.8570565 11.1283565' +
                             ' 12.0004043 11.4086609 12.1446652 11.6880522 12.5290565 12.2322261 11.5356652 12.3627913' +
                             ' 10.6828826 12.4924435 8.93075217 12.5846609 8.90244783 13.7734435 8.87505652 14.9147478' +
                             ' 10.4573609 15.0790957 10.9084043 15.1393565 11.3585348 15.1996174 11.9200565 15.2699217' +
                             ' 12.4706217 15.3484435 13.4165348 15.5018348 14.7623609 15.8086174 15.606013 16.6276174' +
                             ' 15.9365348 16.9480957 16.8806217 17.7780522 17.0814913 17.9460522 17.5736217 18.3569217' +
                             ' 18.5012739 18.7267043 19.4937522 18.1058348 20.3967522 17.542487 20.2725783 16.6230522 19.8489261 15.8387478'} />
                </G>
            </Svg>
            <View style={styles.splashInfo}>
                <Spinner size= 'small' color={colors.secondaryDark}/>
                <Text style={styles.splashInfoLabel}>Beta Version</Text>
            </View>
        </View>
    </Container>
);

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white
    },
    splashSvg: {
        flex: 1
    },
    splashInfo: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 15
    },
    splashInfoLabel: {
        color: colors.secondaryDark
    }
  });

export default Splash;
