import React, { Component } from 'react';
import VersionNumber from 'react-native-version-number';
import { View, Text, StyleSheet, Image, ScrollView, TouchableHighlight, Linking, SafeAreaView, StatusBar } from 'react-native';
import { localeString } from '../locales';
import { PARTNERS } from '../../resources/static/partners';
import AppStyle, { colors, ButtonDimensions } from '../styles/App.style';
import Config from "react-native-config";
import { HeaderBanner } from '../components/HeaderBanner'
import { StackNavigationProp } from '@react-navigation/stack';
import { Separator } from '../components/Separator';

interface PropsType {
    navigation: StackNavigationProp<any>
}

class Impressum extends Component<PropsType> {
    CoronaImage = require('../../resources/images/partners/corona-science.png');
    CoronaUrl = localeString('impressum.partners.corona.hyperlink');

    renderPartners(partnersList: any[]) {
        return partnersList.map((partner, index) => {
            const url = localeString('impressum.partners.' + partner.id + '.hyperlink');
            return (
                <View key={index}>
                    <TouchableHighlight key={partner.id} style={styles.imageContainer} onPress={() => Linking.openURL(url)}  underlayColor={colors.white}>
                        <View>
                            <Image style={styles.partnerImage} resizeMode='contain' source={partner.image}/>
                        </View>
                    </TouchableHighlight>
                    {(index < partnersList.length - 1) && <Separator />}
                </View>
            );
        });
    }

    render() {
        return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.headerGradientEnd }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.headerGradientBegin }}>
                <HeaderBanner title='Impressum' btnClose={true} onClose={() => this.props.navigation.goBack()}/>
                <ScrollView style={[styles.container,{backgroundColor:colors.headerGradientBegin }]}>
                    <View style={styles.cardsContainer}>
                        <View style={styles.card}>
                            <View style={styles.partnerContainer}>
                                <TouchableHighlight onPress={() => Linking.openURL(this.CoronaUrl)}  style={styles.coronaImageContainer} underlayColor={colors.white}>
                                    <View>
                                        <Image style={styles.coronaImage} resizeMode='contain' source={this.CoronaImage}/>
                                        <Text style={styles.partnerLabel}>{VersionNumber.appVersion + ' (Build ' + VersionNumber.buildVersion + ') on ' + Config.HOST}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        {PARTNERS.map((partnerCategory, index) => {
                        return (
                            <View key={index} style={styles.card}>
                                <View style={styles.partnerContainer} key={partnerCategory.categoryId}>
                                    <View style={styles.subtitleContainer}>
                                        <Text style={styles.subtitle}>{localeString('impressum.categories.' + partnerCategory.categoryId)}</Text>
                                    </View>
                                    <View style={styles.partnerList}>
                                        {this.renderPartners(partnerCategory.partners)}
                                    </View>
                                </View>
                            </View>
                        );})}
                    </View>
            </ScrollView>
        </SafeAreaView>
        </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: ButtonDimensions.padding_big,
      paddingVertical: ButtonDimensions.padding_small
    },
    cardsContainer:{
        paddingBottom: ButtonDimensions.padding_big
    },
    card:{
        paddingVertical: ButtonDimensions.padding_small,
        marginVertical: ButtonDimensions.padding_small,
        backgroundColor: colors.white,
        borderRadius: 10
    },
    subtitleContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 15,
        color: colors.black
    },
    partnerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    partnerList: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    partnerImage: {
        height: 100,
        marginHorizontal: 10,
        marginVertical: 10,
        maxWidth: 250
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    coronaImageContainer: {
        width: '100%'
    },
    coronaImage: {
        height: 180,
        width: undefined,
        marginHorizontal: 30,
        marginVertical: 10,
    },
    partnerLabel: {
        margin: 5,
        textAlign: 'center',
        fontSize: 10
    }
  });

export default Impressum;
