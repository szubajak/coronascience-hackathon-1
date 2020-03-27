import { QUESTIONS_TESTRESULT_VALUECODING, QUESTIONS_YESNO} from './codings'

const QUESTION_YESNO_ANSWEROPTIONS = {
    yes: {
        display: "Ja",
        code: QUESTIONS_YESNO.yes
    },
    no: {
        display: "Nein",
        code: QUESTIONS_YESNO.no
    }
}

const QUESTION_TESTRESULT_ANSWEROPTIONS = {
    positive: {
        display: "Positiv",
        code: QUESTIONS_TESTRESULT_VALUECODING.positive
    },
    negative: {
        display: "Negativ",
        code: QUESTIONS_TESTRESULT_VALUECODING.negative
    },
    pending: {
        display: "Ausstehend",
        code: QUESTIONS_TESTRESULT_VALUECODING.pending
    }
}

export const QUESTIONS_DATA = [
    {
        id: '1',
        text: 'Hast du den Verdacht, an COVID-19 zu leiden?',
        answerOptions: QUESTION_YESNO_ANSWEROPTIONS,
        dependingFrom: undefined
    },
    {
        id: '2',
        text: 'Ist jemand aus deinem nahen Umfeld infiziert?',
        answerOptions: QUESTION_YESNO_ANSWEROPTIONS,
        dependingFrom: undefined
    },
    {
        id: '3',
        text: 'Wurdest du auf COVID-19 gestestet?',
        answerOptions: QUESTION_YESNO_ANSWEROPTIONS,
        dependingFrom: undefined
    },
    {
        id: '3.1',
        text: 'Wie lautet das Testergebnis?',
        answerOptions: QUESTION_TESTRESULT_ANSWEROPTIONS,
        dependingFrom: {
            id: '3',
            criterium: QUESTION_YESNO_ANSWEROPTIONS.yes
        }
    },
]
