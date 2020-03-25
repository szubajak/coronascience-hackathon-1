import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking, Alert, Image, FlatList, YellowBox } from 'react-native';
import AppStyle, { colors, AppFonts, TextSize } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { localeString } from '../locales';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Container, Content, List, ListItem, Text, Body, Right, Picker, Header, Button, Icon } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Slider from '@react-native-community/slider';

// well, we need the FlatList, and we need vertical scrolling, and we don't care if its not lazy-loading because the list is not that big
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

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

const PLUS_ANSWER_OPTIONS = [{display: '0', code: '0', selected: true},
                {display: '+', code: '1', selected: false},
                {display: '++', code: '2', selected: false},
                {display: '+++', code: '3', selected: false}];

const SYMPTOM_DATA = [
  // { symptom: {display: 'Temperatur (in C)',code: '123'},
  //   answerOptions: [{display: '< 37.5', code: 'normal', selected: true},
  //                   {display: '37.5 - 38', code: 'lowFever', selected: false},
  //                   {display: '> 38', code: 'highFever', selected: false}] },
  { symptom: {display: 'Husten', code: '234'},
    answerOptions: PLUS_ANSWER_OPTIONS },
  { symptom: {display: 'Müdigkeit', code: '345'},
    answerOptions: PLUS_ANSWER_OPTIONS },
  { symptom: {display: 'Hals\u00ADschmerzen', code: '456'},
    answerOptions: PLUS_ANSWER_OPTIONS },
  { symptom: {display: 'Atemnot in Ruhe', code: '567'},
    answerOptions: PLUS_ANSWER_OPTIONS },
  { symptom: {display: 'Kopf\u00ADschmerzen', code: '678'},
    answerOptions: PLUS_ANSWER_OPTIONS },
  { symptom: {display: 'Durchfall', code: '789'},
    answerOptions: PLUS_ANSWER_OPTIONS },
  { symptom: {display: 'Übelkeit', code: '890'},
    answerOptions: PLUS_ANSWER_OPTIONS },
  { symptom: {display: 'Geruchs\u00ADverlust', code: '901'},
    answerOptions: PLUS_ANSWER_OPTIONS }
]


/**
 * Component to display a selector where the user can input a symptom severity$
 * @param symptom: the symptom, with a display text property and a code (e.g. snomed or loinc)
 **/
class SymptomSeverity extends Component<{symptom: {display: string, code: string}, answerOptions: [AnswerOption]}> {
  select(option: AnswerOption) {
    console.log('item selected', option);
    option.selected = true;
  }
  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1, justifyContent: 'center', marginTop: AppStyle.button.marginTop}}>
            <Text style={[AppStyle.textQuestion]}>{this.props.symptom.display}</Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <FlatList
              horizontal
              alwaysBounceHorizontal = 'false'
              data={this.props.answerOptions}
              renderItem={({ item }) =>
                <View style={{flex: 1, marginLeft: 5}}>
                  <Button style={[AppStyle.button, item.selected ? styles.selectedButton : AppStyle.button]} onPress={() => this.select(item)}>
                    <Text style={[AppStyle.textButton, item.selected ? styles.selectedTextButton : AppStyle.textButton]}>{item.display}</Text>
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
                  <Col key={index} style={[styles.columns]}>
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
                style={{height: '100%', paddingHorizontal:'5%', paddingTop: 20}}
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

              <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                  <Text style={[AppStyle.textQuestion]}>Temperatur (in C)</Text>
                  <Text style={[AppStyle.textQuestion, {color: colors.secondaryNormal}]}>35.4°</Text>
                </View>
                <View>
                  <Slider
                    style={{width: '100%', height: 40}}
                    minimumValue={35}
                    maximumValue={41}
                    step={0.1}
                    value={36.5}
                    thumbTintColor={colors.secondaryDark}
                    minimumTrackTintColor={colors.secondaryLight}
                    maximumTrackTintColor={colors.darGray}
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: -8, marginHorizontal: 5}}>
                  <Text style={[AppStyle.textQuestion, {color: colors.darkGray}]}>35</Text>
                  <Text style={[AppStyle.textQuestion, {color: colors.darkGray}]}>36</Text>
                  <Text style={[AppStyle.textQuestion, {color: colors.darkGray}]}>37</Text>
                  <Text style={[AppStyle.textQuestion, {color: colors.darkGray}]}>38</Text>
                  <Text style={[AppStyle.textQuestion, {color: colors.darkGray}]}>39</Text>
                  <Text style={[AppStyle.textQuestion, {color: colors.darkGray}]}>40</Text>
                  <Text style={[AppStyle.textQuestion, {color: colors.darkGray}]}>41</Text>
                </View>
              </View>


              <FlatList
                data={SYMPTOM_DATA}
                renderItem={({ item }) =>
                  <SymptomSeverity symptom={item.symptom} answerOptions={item.answerOptions} />}
                keyExtractor={item => item.symptom.code}
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
  selectedButton: {
    backgroundColor: colors.secondaryNormal
  },
  selectedTextButton: {
    color: colors.white
  }
});

export default Symptom;
