import { StyleSheet, Dimensions } from 'react-native';

// Fonts
export const AppFonts = {
    normal: 'Roboto-Book',
    bold: 'Roboto-Bold'
};

// Text Size
export const TextSize = {
    very_small: 14,
    small: 18,
    normal: 20,
    big: 24,
    very_big: 30
};

// const Dimensions
export const ButtonDimensions = {
    button_small_h: 30,
    padding_small: 10,
    padding_big: 20
};

// Colors
export const colors = {
    black: '#1a1917',
    white: '#FFFFFF',
    darkGray: '#888888',
    lightGray: '#efeff4',



    primaryNormal: '#FFFFFF',
    primaryLight: '#FFFFFF',
    primaryDark: '#cccccc',

    secondaryNormal: '#930031',
    secondaryLight: '#c9435a',
    secondaryDark: '#5e000a',



    success: '#69C344',
    warning: '#fb8c00',
    alert: '#E8283F',

    firstLevel: 'rgb(173, 250, 90)',
    secondLevel: 'rgb(250, 255, 90)',
    thirdLevel: 'rgb(255, 200, 60)',
    fourthLevel: 'rgb(250, 125, 90)',
    fithLevel: 'rgb(190, 100, 255)'
    
};

export default StyleSheet.create({
    statusBar: {
        flex: 1,
        backgroundColor: colors.primaryNormal
    },

    textButton:{
        color: colors.secondaryNormal,
        width: '100%',
        textAlign: 'center',
        fontSize: TextSize.very_small,
        borderRadius: 10,
    },

    button:{
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.secondaryNormal,
        width: '100%',
        marginTop: 15,
        height: 35
    },

    sectionTitle:{
        fontSize: TextSize.normal,
        color: colors.secondaryNormal,
        marginTop: 20
    }
});