import React, { Component, isValidElement } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, StatusBar, Linking, Alert } from 'react-native';
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

export enum YesNo{
  NO = 'Nein',
  YES = 'Ja'
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

  openURL( _url : string){
    Linking.canOpenURL(_url).then(supported => {
        if (supported) {
          Linking.openURL(_url);
        } else {
          console.log("Don't know how to open URI: " + _url);
        }
      });
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
        <StatusBar backgroundColor={colors.headerGradientEnd} barStyle="light-content" />
        <SafeAreaView style={{ flex: 0, backgroundColor: colors.headerGradientEnd }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <HeaderBanner title='Symptome erfassen'/>
            <ScrollView
                style={{height: '100%', marginLeft:'10%', marginRight:'10%'}}
                contentInsetAdjustmentBehavior="automatic">
                <View>
                    <Text style={[AppStyle.textQuestion]}>
                        Bitte wähle die zutreffenden Symptome aus:
                    </Text>
                </View>
                <Grid>
                  <Row>
                    <Col style={[styles.columns]}>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Fieber</Text>
                      </Button>
                    </Col>
                    <Col style={[styles.columns]}>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Husten</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Müdigkeit</Text>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={[styles.columns]}>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Halsschmerzen</Text>
                      </Button>
                    </Col>
                    <Col style={[styles.columns]}>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Atemnot</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Kopfschmerzen</Text>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={[styles.columns]}>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Durchfall</Text>
                      </Button>
                    </Col>
                    <Col style={[styles.columns]}>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Übelkeit</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Andere</Text>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                      <Button style={[AppStyle.button]}>
                        <Text style={[AppStyle.textButton]}>Ich habe keine Symptome</Text>
                      </Button>
                  </Row>
              </Grid>
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
    marginRight: 8
  },

});

export default Symptom;