import { SYMPTOM_SEVERITY_CODEABLE_CONCEPT, SYMPTOM_CODE} from './codings'

const SYMPTOM_ANSWER_OPTIONS = [{display: '0', code: SYMPTOM_SEVERITY_CODEABLE_CONCEPT.none, selected: true, key: '0'},
                                {display: '+', code: SYMPTOM_SEVERITY_CODEABLE_CONCEPT.mild, selected: false, key: '1'},
                                {display: '++', code: SYMPTOM_SEVERITY_CODEABLE_CONCEPT.moderate, selected: false, key: '2'},
                                {display: '+++', code: SYMPTOM_SEVERITY_CODEABLE_CONCEPT.severe, selected: false, key: '3'}];

export const SYMPTOM_DATA = [
  {
    symptom: {
      display: 'Husten',
      code: SYMPTOM_CODE.cough,
      key: '0'
    },
    answerOptions: SYMPTOM_ANSWER_OPTIONS
  },
  {
    symptom: {
      display: 'Müdigkeit',
      code: SYMPTOM_CODE.fatigue,
      key: '1'
    },
    answerOptions: SYMPTOM_ANSWER_OPTIONS
  },
  {
    symptom: {
      display: 'Hals\u00ADschmerzen',
      code: SYMPTOM_CODE.throatPain,
      key: '2'
    },
    answerOptions: SYMPTOM_ANSWER_OPTIONS
  },
  {
    symptom: {
      display: 'Atemnot in Ruhe',
      code: SYMPTOM_CODE.dyspnea,
      key: '3'
    },
    answerOptions: SYMPTOM_ANSWER_OPTIONS
  },
  {
    symptom: {
      display: 'Kopf\u00ADschmerzen',
      code: SYMPTOM_CODE.headache,
      key: '4'
    },
    answerOptions: SYMPTOM_ANSWER_OPTIONS
  },
  {
    symptom: {
      display: 'Durchfall',
      code: SYMPTOM_CODE.diarrhea,
      key: '5'
    },
    answerOptions: SYMPTOM_ANSWER_OPTIONS
  },
  {
    symptom: {
      display: 'Übelkeit',
      code: SYMPTOM_CODE.nausea,
      key: '6'
    },
    answerOptions: SYMPTOM_ANSWER_OPTIONS
  },
  {
    symptom: {
      display: 'Geruchs- / Geschmacks\u00ADverlust',
      code: SYMPTOM_CODE.anosmia,
      key: '7'
    },
    answerOptions: SYMPTOM_ANSWER_OPTIONS
  }
]
