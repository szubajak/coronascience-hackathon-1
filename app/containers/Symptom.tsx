import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking, Alert, Image, FlatList } from 'react-native';
import AppStyle, { colors, AppFonts, TextSize } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { localeString } from '../locales';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Container, Content, List, ListItem, Text, Body, Right, Picker, Header, Button, Icon } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

interface PropsType {
}

interface State {
  isDateTimePickerVisible: boolean;
  dateTimeSymptome: Date;
}

interface AnswerOption {
  display: string;
  code: string;
  selected: boolean
}

export enum YesNo{
  NO = 'Nein',
  YES = 'Ja'
}


/**
 * Component to display a selector where the user can input a symptom severity$
 * @param symptom: the symptom, with a display text property and a code (e.g. snomed or loinc)
 **/
class SymptomSeverity extends Component<{symptom: {display: string, code: string}, answerOptions: [AnswerOption]}> {
  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[AppStyle.textQuestion, {flex: 1, marginTop: 23}]}>{this.props.symptom.display}</Text>
          <View style={{flex: 3, alignItems: 'flex-end'}}>
            <FlatList
              horizontal
              data={this.props.answerOptions}
              renderItem={({ item }) =>
                <View style={{flex: 1, marginLeft: 5}}>
                  <Button style={[AppStyle.button]}>
                    <Text style={[AppStyle.textButton]}>{item.display}</Text>
                  </Button>
                </View>}
              keyExtractor={item => item.code}
            />
          </View>
      </View>
    );
  }
}


class Symptom extends Component<PropsType, State> {

  private dateChanged : boolean = false;

  constructor(props: PropsType) {
    super(props);

    this.state ={
      isDateTimePickerVisible: false,
      dateTimeSymptome: new Date(),
    }
  }


  showDateTimePicker(){
    this.setState({ isDateTimePickerVisible: true });
  }

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  onDatePickerClose = (time : Date) => {
    this.hideDateTimePicker();
    if(!this.dateChanged)
        return;
  };

  onDatePickerChangeValue(){
    this.dateChanged = true;
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
                    <Text style={[AppStyle.sectionTitle]}>Symptome</Text>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <Text style={[AppStyle.textQuestion]}>{new Date().toString().slice(4,21)}</Text>
                      <Image source={require('../../resources/images/icon_add.png')} style={{width: 15, height: 15}} />
                    </View>
                  </View>
                <Separator/>
              </View>

              <SymptomSeverity
                symptom={{display: 'Temperatur (in C)', code: '123'}}
                answerOptions={[{display: '< 37.5', code: 'normal', selected: true},
                                {display: '37.5 - 38', code: 'lowFever', selected: false},
                                {display: '> 38', code: 'highFever', selected: false}]}
              />
              <SymptomSeverity
                symptom={{display: 'Husten', code: '123'}}
                answerOptions={[{display: '0', code: '0', selected: true},
                                {display: '+', code: '1', selected: false},
                                {display: '++', code: '2', selected: false},
                                {display: '+++', code: '3', selected: false}]}
              />
              <SymptomSeverity
                symptom={{display: 'Müdigkeit', code: '123'}}
                answerOptions={[{display: '0', code: '0', selected: true},
                                {display: '+', code: '1', selected: false},
                                {display: '++', code: '2', selected: false},
                                {display: '+++', code: '3', selected: false}]}
              />
              <Separator/>
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
    marginRight: 5
  },

});

export default Symptom;
