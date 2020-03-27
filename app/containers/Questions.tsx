import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking, Alert } from 'react-native';
import AppStyle, { colors, AppFonts, TextSize } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { localeString } from '../locales';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Container, Content, List, ListItem, Text, Body, Right, Picker, Header, Button, Icon } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';


const SMALLSCREEN_CUTOFF = 360;

interface PropsType {
}

interface State {
}

export enum YesNo{
  NO = 'Nein',
  YES = 'Ja'
}

class Questions extends Component<PropsType, State> {

  constructor(props: {navigation: any}) {
    super(props);
  }

  renderQuestion(_question : String){
    return (
      <View>
        <Text style={[AppStyle.textQuestion]}>
            {_question}
        </Text>
        <Grid>
          <Row>
                {[YesNo.YES, YesNo.NO].map((value, index) => (
                  <Col style={[styles.columns]}>
                    <Button style={[AppStyle.button]}
                      onPress={() => Alert.alert('danke')}>
                      <Text style={[AppStyle.textButton]}>
                        {value}
                      </Text>
                    </Button>
                  </Col>
                ))}
          </Row>
        </Grid>
    </View>
  )};

  render() {
    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: colors.headerGradientEnd }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <HeaderBanner title='Erfassung'/>
            <ScrollView
                style={{height: '100%', paddingHorizontal:'10%'}}
                contentInsetAdjustmentBehavior="automatic">
                <View>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[AppStyle.sectionTitle]}>Weitere Informationen</Text>
                  </View>
                <Separator/>
              </View>
              {this.renderQuestion('Hast du den Verdacht, an COVID-19 zu leiden?')}
              <Separator/>
              {this.renderQuestion('Ist jemand aus deinem nahen Umfeld infiziert?')}
              <Separator/>
              {this.renderQuestion('Befindest du dich mehrheutlicht zu Hause?')}
              <Separator/>
              {this.renderQuestion('Hast du eine Arztpraxis oder eine Notfallaufnahme kontaktiert?')}
              <Separator/>
              {this.renderQuestion('Wurdest du auf COVID-19 getestet?')}
            </ScrollView>
        </SafeAreaView>
      </>
    );
  };
}



const styles = StyleSheet.create({
    columns: {
      marginRight: 8
    },
});

export default Questions;
