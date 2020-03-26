import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Alert, Image, FlatList, YellowBox } from 'react-native';
import AppStyle, { colors } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Container, Content, List, ListItem, Text, Body, Right, Picker, Header, Button, Switch, CheckBox,  } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import Slider from '@react-native-community/slider';
import { SYMPTOM_DATA } from '../../resources/static/symptoms'

// well, we need the FlatList, and we need vertical scrolling, and we don't care if its not lazy-loading because the list is not that big
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

interface PropsType {
}

interface State {
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
 * Main class defining the component.
 **/
class Symptom extends Component<PropsType, State> {

  private dateChanged : boolean = false;

  constructor(props: PropsType) {
    super(props);

    this.state ={
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

            <TemperatureSlider display="Körpertemperatur (in °C)" minimum={36} maximum={42} default={36.8} coding={{code: '123'}}/>

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

/**
 * Subcomponents used in Symptom component
 **/

/**
 * Component to display a selector where the user can input a symptom severity
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

/**
 * Component to display a selector where the user can input a symptom severity$
 * @param display the label to be shown
 * @param minimum the minimal value of the slider
 * @param maximum the maximal value of the slider
 * @param default the default value the slider has when first rendered
 * @param coding the coding for how the temperature should be returned when read
 **/
class TemperatureSlider extends Component<{display: string, minimum: number, maximum: number, default: number, coding: any}> {
  state = {
    temperature: this.props.default,
    enabled: true
  };
  labelNumbers = new Array<number>();
  constructor(props: {display: string, minimum: number, maximum: number, default: number, coding: any}){
    super(props);
    for (let i = props.minimum; i <= props.maximum; i++) {
      this.labelNumbers.push(i);
    }
  }

  private temperatureToString(temperature: number) {

    return !this.state.enabled ?
          ' ' : temperature < this.props.minimum ?
            '<' + this.props.minimum.toString() + ' °C':
            temperature > this.props.maximum ?
              '>' + this.props.maximum.toString() + ' °C' :
              temperature.toString() + ' °C';
  }

  /**
   * Read the current temperature value as a string
   * @return the temperature value in the format of '36.8', respectively like '<35' or '>41' if temperature is set to the very end of the slider
   */
  getTemperatureAsString() {
    return this.temperatureToString(this.state.temperature);
  }

  /**
   * Returns the current temperature as a coding (to be defined)
   */
  getTemperatureAsCoding() {
    return {warning: 'not yet implemented'};
  }

  render() {
    const labels = this.labelNumbers.map((number) =>
      <Text style={[AppStyle.textQuestion, {color: colors.darkGray}]} key={number}>{number}</Text>
    );
    return (
      <View>
        <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
          <View style={{flexDirection: 'row'}}><Text style={[AppStyle.textQuestion]}>Temperatur gemessen</Text></View>
          <View style={{flexDirection: 'row'}}>
            <Button style={[AppStyle.button, this.state.enabled ? styles.selectedButton : AppStyle.button, {width: 68, marginTop: -7, borderTopRightRadius: 0, borderBottomRightRadius: 0}]} onPress={() => {this.setState({enabled: !this.state.enabled})}}>
                <Text style={[AppStyle.textButton, this.state.enabled ? styles.selectedTextButton : AppStyle.textButton]}>Ja</Text>
            </Button>
            <Button style={[AppStyle.button, !this.state.enabled ? styles.selectedButton : AppStyle.button, {width: 68, marginTop: -7, borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]} onPress={() => {this.setState({enabled: !this.state.enabled})}}>
                <Text style={[AppStyle.textButton, !this.state.enabled ? styles.selectedTextButton : AppStyle.textButton]}>Nein</Text>
            </Button>
          </View>
        </View>
        <Text style={[AppStyle.textQuestion, {color: colors.secondaryNormal, alignSelf: 'center', marginTop: 10}]}>{this.temperatureToString(this.state.temperature)}</Text>
          <Slider
            style={{width: '100%', height: 40}}
            minimumValue={this.props.minimum - 0.1}
            maximumValue={this.props.maximum + 0.1}
            step={0.1}
            disabled={!this.state.enabled}
            value={this.state.temperature}
            thumbTintColor={colors.secondaryDark}
            minimumTrackTintColor={colors.secondaryLight}
            maximumTrackTintColor={colors.darkGray}
            onValueChange={temperature => this.setState({temperature: Math.round(temperature * 10)/10})}
          />
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: -8, marginHorizontal: 10}}>
          {labels}
        </View>
        </View>

      </View>
    );
  }
}

/**
 * Styles
 **/

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
