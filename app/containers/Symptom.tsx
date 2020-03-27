import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, FlatList, YellowBox, Alert, TextInput } from 'react-native';
import AppStyle, { colors } from '../styles/App.style';
import { Separator } from '../components/Separator'
import { HeaderBanner } from '../components/HeaderBanner'
import { View, Text, Button } from 'native-base';
import Slider from '@react-native-community/slider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Observation, CodeableConcept, ObservationStatus, I4MIBundle, BundleType, BundleHTTPVerb} from '@i4mi/fhir_r4'
import { localeString } from '../locales';
import { SYMPTOM_DATA } from '../../resources/static/symptoms'
import { SYMPTOM_CATEGORY, SYMPTOM_SEVERITY_CODEABLE_CONCEPT, SYMPTOM_CODE, TEMPERATURE_VALUE_QUANTITY } from '../../resources/static/codings'

// well, we need the FlatList, and we need vertical scrolling, and we don't care if its not lazy-loading because the list is not that big
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

interface PropsType {
  navigation: any;
}

interface State {
  showDatePicker: boolean;
  date: Date;
  debugText: string;
}

/**
 * Main class defining the component.
 **/
class Symptom extends Component<PropsType, State> {
  symptomObservationGetters: {(): Observation}[]
  temperatureObservationGetter: {(): Observation | undefined}; // undefined if no temperature was measured

  constructor(props: PropsType) {
    super(props);
    this.state = {
      showDatePicker: false,
      date: new Date(),
      debugText: '...'
    };

    // initialize the array of observationGetter functions with the number of symptoms we have got
    this.symptomObservationGetters = new Array<{(): Observation}>(SYMPTOM_DATA.length);
    this.temperatureObservationGetter = () => undefined; // set placeholder until it's set when temperature component is mounted

    // bind the registering and handling functions to this, they can access the ObservationGetters
    this.registerSymptomHandleFunction = this.registerSymptomHandleFunction.bind(this);
    this.registerTemperatureHandleFunction = this.registerTemperatureHandleFunction.bind(this);
    this.createFhirBundle = this.createFhirBundle.bind(this);
  }

  componentDidMount() {
    // refresh date and time every time the component is shown
    this.props.navigation.addListener('focus', () => {
      this.setState({date: new Date()})
    });
  }

  private formattedDateTime(date: Date): string {
    const month = localeString('month')[date.getMonth()];
    const hours = date.getHours();
    let minutes = date.getMinutes();
    return date.getDate() + '. ' + month + ' ' + date.getFullYear() + ', ' + hours + ':' + (minutes > 9 ? minutes.toString() : '0' + minutes.toString());
  }

  private processDatePickerInput(date: Date) {
    this.setState({showDatePicker: false});
    this.setState({date: date});
  }

  private registerSymptomHandleFunction(func: () => Observation, key: number){
    this.symptomObservationGetters[key] = func;
  }

  private registerTemperatureHandleFunction(func: () => Observation) {
    this.temperatureObservationGetter = func;
    console.log('registered temperature observation getter');
  }

  private createFhirBundle() {
    console.log('called createFhirBundle')
    const bundle = new I4MIBundle(BundleType.TRANSACTION);
    // TODO: iterate through the subcomponents:
    // - get their observations DONE
    // - add effectiveDateTime to every observation DONE
    // - put observations into bundle DONE
    // - save bundle to MIDATA

    // fetch all symptoms observations and add them to the bundle
    this.symptomObservationGetters.forEach((getter) => {
      const symptomFhir = getter();
      // set observation date
      symptomFhir.effectiveDateTime = this.state.date.toISOString();
      bundle.addEntry(BundleHTTPVerb.POST, 'Observation', symptomFhir);
    });

    // get the temperature observations
    const temperatureFhir = this.temperatureObservationGetter();
    // if it's set (may be undefined because the user did not measure),
    // we can add temperature and add it to the bundle
    if (temperatureFhir) {
      temperatureFhir.effectiveDateTime = this.state.date.toISOString();
      bundle.addEntry(BundleHTTPVerb.POST, 'Observation', temperatureFhir);
    }

    // for debugging TODO remove
    this.setState({debugText: JSON.stringify(bundle)})
  }


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
                    <Text style={[AppStyle.textQuestion]} onPress={() => this.setState({showDatePicker: true})}>vom {this.formattedDateTime(this.state.date)}</Text>
                    <Image source={require('../../resources/images/icon_add.png')} style={{width: 15, height: 15}} />
                  </View>
                </View>
              <Separator/>
            </View>

            <TemperatureSlider display="Körpertemperatur (in °C)" minimum={36} maximum={42} default={36.8} setHandleFunction={this.registerTemperatureHandleFunction}/>

            <FlatList
              data={SYMPTOM_DATA}
              renderItem={({ item, index }) =>
                <SymptomSeverity symptom={item.symptom} index={index} answerOptions={item.answerOptions} setHandleFunction={this.registerSymptomHandleFunction}/>
              }
              keyExtractor={(item, index) => index + '.' + item.symptom.display}
            />

            <View style={{flexDirection: 'row', marginTop: 25, marginBottom: 10, alignSelf: 'center'}}>
              <View style={{marginRight: '10%'}}>
              <Text style={[AppStyle.textQuestion]}>0 = {localeString('severity.none')}</Text>
              <Text style={[AppStyle.textQuestion]}>+ = {localeString('severity.mild')}</Text>
              </View>
              <View>
              <Text style={[AppStyle.textQuestion]}>++ = {localeString('severity.moderate')}</Text>
              <Text style={[AppStyle.textQuestion]}>+++ = {localeString('severity.severe')}</Text>
              </View>
            </View>

            <Button style={[AppStyle.button, {marginBottom: 40}]}>
                <Text style={AppStyle.textButton} onPress={() => this.createFhirBundle()}>Weiter</Text>
            </Button>

              <TextInput style={{marginBottom: 300,fontSize: 12, borderWidth: 1}} value={this.state.debugText}></TextInput>

          </ScrollView>

          <DateTimePickerModal
            isVisible={this.state.showDatePicker}
            headerTextIOS="Für welchen Zeitpunkt möchtest du die Symptome erfassen?"
            cancelTextIOS="Abbrechen"
            confirmTextIOS="OK"
            locale="de"
            maximumDate={new Date()}
            mode="datetime"
            minuteInterval={15}
            onConfirm={date => this.processDatePickerInput(date)}
            onCancel={() => this.setState({showDatePicker: false})}
          />

        </SafeAreaView>
      </>
    );
  };
}

/**
 * Subcomponents used in Symptom component
 **/

interface SymptomSeverityPropsType {
  symptom: {
    display: string;
    code: CodeableConcept;
  },
  index: number;
  answerOptions: AnswerOption[];
  setHandleFunction(func: () => Observation, key: number): void;
}

interface AnswerOption {
  display: string;
  key: string;
  code: CodeableConcept;
  selected: boolean;
}

/**
 * Component to display a selector where the user can input a symptom severity
 * @param symptom: the symptom, with a display text property and a code (e.g. snomed or loinc)
 **/
class SymptomSeverity extends Component<SymptomSeverityPropsType> {
  fhirSymptom: Observation;
  state = {
    answerOptions: this.props.answerOptions
  }

  constructor(props: SymptomSeverityPropsType) {
    super(props);
    // build the basic FHIR resource
    this.fhirSymptom = {
      resourceType: 'Observation',
      status: ObservationStatus.PRELIMINARY,
      code: props.symptom.code,
      category: SYMPTOM_CATEGORY.survey,
      valueCodeableConcept: SYMPTOM_SEVERITY_CODEABLE_CONCEPT.none // default is none
    }

    this.getSymptomAsFhir = this.getSymptomAsFhir.bind(this);

  }

  componentDidMount() {
    this.props.setHandleFunction(this.getSymptomAsFhir, this.props.index);
  }

  private select(clicked: AnswerOption) {
    this.state.answerOptions.forEach((option) => {
      if(clicked.code === option.code) {
        option.selected = true;
        // this safes the selected option to the fhir object
        this.fhirSymptom.valueCodeableConcept = clicked.code;
      } else {
        option.selected = false;
      }
    });
    this.setState({answerOptions: this.state.answerOptions});
  }

  /**
   * Returns the current symptom and its selected severity encoded as a fhir Observation.
   * Just add effectiveDateTime and you're good to go.
   **/
  getSymptomAsFhir(): Observation {
    return this.fhirSymptom;
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
            alwaysBounceHorizontal = {false}
            data={this.state.answerOptions}
            keyExtractor={item => item.key}
            renderItem={({ item }) =>
              <Button style={[AppStyle.button, item.selected ? styles.selectedButton : AppStyle.button, {flex: 1, marginLeft: 5}]} onPress={() => this.select(item)}>
                <Text style={[AppStyle.textButton, item.selected ? styles.selectedTextButton : AppStyle.textButton]}>{item.display}</Text>
              </Button>
            }
          />
        </View>
      </View>
    );
  }
}


interface TemperatureSliderPropsType {
  display: string;
  minimum: number;
  maximum: number;
  default: number;
  setHandleFunction(func: () => Observation | undefined): void;
}

interface TemperatureSliderState {
  temperature: number;
  enabled: boolean;
}

/**
 * Component to display a selector where the user can input his body temperature.
 * You can read the current temperature by calling the getTemperatureAsCoding() respectively
 * getTemperatureAsString() methods.
 *
 * @param display the label to be shown
 * @param minimum the minimal value of the slider
 * @param maximum the maximal value of the slider
 * @param default the default value the slider has when first rendered
 * @param coding the coding for how the temperature should be returned when read
 **/
class TemperatureSlider extends Component<TemperatureSliderPropsType, TemperatureSliderState> {
  temperatureFhir: Observation;
  state = {
    temperature: this.props.default,
    enabled: true
  };
  labelNumbers = new Array<number>();

  constructor(props: TemperatureSliderPropsType){
    super(props);
    for (let i = props.minimum; i <= props.maximum; i++) {
      this.labelNumbers.push(i);
    }

    // prepare FHIR resource
    this.temperatureFhir = {
      resourceType: 'Observation',
      status: ObservationStatus.PRELIMINARY,
      category: SYMPTOM_CATEGORY.vitalSigns,
      code: SYMPTOM_CODE.bodyTemperature,
      valueQuantity: TEMPERATURE_VALUE_QUANTITY
    }

    this.getTemperatureAsFhir = this.getTemperatureAsFhir.bind(this);
  }

  componentDidMount() {
    this.props.setHandleFunction(this.getTemperatureAsFhir);
  }

  private temperatureToString(temperature: number) {
    return this.state.enabled ?
            temperature < this.props.minimum ?
              '<' + this.props.minimum.toString() + ' °C':
              temperature > this.props.maximum ?
                '>' + this.props.maximum.toString() + ' °C' :
                temperature.toString() + ' °C' :
            ' ';
  }

  /**
   * Returns the current temperature as a fhir observation.
   * Just add effectiveDateTime and you're good to go.
   * @return a fhir observation object, or undefined if the user did not measure an observation
   */
  getTemperatureAsFhir(): Observation | undefined {
    Alert.alert('Temperature is ' + this.state.enabled);
    if (this.temperatureFhir.valueQuantity) {
      this.temperatureFhir.valueQuantity.value = this.state.temperature;
    }
    return this.state.enabled ? this.temperatureFhir : undefined;
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
