const SYMPTOM_ANSWER_OPTIONS = [{display: '0', code: '0', selected: true},
                                {display: '+', code: '1', selected: false},
                                {display: '++', code: '2', selected: false},
                                {display: '+++', code: '3', selected: false}];

export const SYMPTOM_DATA = [
  { symptom: {display: 'Husten', code: '234'},
    answerOptions: SYMPTOM_ANSWER_OPTIONS },
  { symptom: {display: 'Müdigkeit', code: '345'},
    answerOptions: SYMPTOM_ANSWER_OPTIONS },
  { symptom: {display: 'Hals\u00ADschmerzen', code: '456'},
    answerOptions: SYMPTOM_ANSWER_OPTIONS },
  { symptom: {display: 'Atemnot in Ruhe', code: '567'},
    answerOptions: SYMPTOM_ANSWER_OPTIONS },
  { symptom: {display: 'Kopf\u00ADschmerzen', code: '678'},
    answerOptions: SYMPTOM_ANSWER_OPTIONS },
  { symptom: {display: 'Durchfall', code: '789'},
    answerOptions: SYMPTOM_ANSWER_OPTIONS },
  { symptom: {display: 'Übelkeit', code: '890'},
    answerOptions: SYMPTOM_ANSWER_OPTIONS },
  { symptom: {display: 'Geruchs\u00ADverlust', code: '901'},
    answerOptions: SYMPTOM_ANSWER_OPTIONS }
]
