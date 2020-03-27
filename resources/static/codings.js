/**
 * SNOMED CT codings for symptom severities (none, mild, moderate, severe)
 * just add as the valueCodeableConcept property to the symptoms observation
 * resource.
 **/
export const SYMPTOM_SEVERITY_CODEABLE_CONCEPT = {
  none: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '260413007',
        display: 'None (qualifier value)'
      }
    ]
  },
  mild: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '255604002',
        display: 'Mild (qualifier value)'
      }
    ]
  },
  moderate: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '6736007',
        display: 'Moderate (severity modifier) (qualifier value)'
      }
    ]
  },
  severe: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '24484000',
        display: 'Severe (severity modifier) (qualifier value)'
      }
    ]
  }
}

/**
 * SNOMED CT codings for symptoms as specified.
 * just add as the code property to the symptoms observation
 * resource.
 **/
export const SYMPTOM_CODE = {
  cough: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '49727002',
        display: 'Cough (finding)'
      }
    ]
  },
  fatigue: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '84229001',
        display: 'Fatigue (finding)'
      }
    ]
  },
  throatPain: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '162397003',
        display: 'Pain in throat (finding)'
      }
    ]
  },
  dyspnea: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '161941007',
        display: 'Dyspnea at rest (finding)'
      }
    ]
  },
  headache: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '25064002',
        display: 'Headache (finding)'
      }
    ]
  },
  diarrhea: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '62315008',
        display: 'Diarrhea (finding)'
      }
    ]
  },
  nausea: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '422587007',
        display: 'Nausea (finding)'
      }
    ]
  },
  anosmia: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '44169009',
        display: 'Loss of sense of smell (finding)'
      }
    ]
  },
  bodyTemperature: {
    coding: [
      {
        system: 'http://loinc.org',
        code: '8310-5',
        display: 'Body temperature'
      },
      {
        system: 'http://snomed.info/sct',
        code: '105723007',
        display: 'Body temperature finding (finding)'
      }
    ]
  }
}

/**
 * HL7 codings for resource category.
 * just add as the category property to the symptoms observation
 * resource.
 **/
export const SYMPTOM_CATEGORY = {
  survey: [
    {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/observation-category',
          code: 'survey',
          display: 'Survey'
        }
      ]
    }
  ],
  vitalSigns: [
    {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/observation-category',
          code: 'vital-signs',
          display: 'Vital Signs'
        }
      ]
    }
  ]
}
/**
 * Codings for temperature value quantity
 * just add as the valueQuantity property to the temperature observation
 * resource (and don't forget to set the value!)
 **/
export const TEMPERATURE_VALUE_QUANTITY = {
    value: undefined,
    unit: '°C',
    system: 'http://unitsofmeasure.org',
    code: 'Cel'
  }

 /**
  * Codings for using in questionnaire response (test results)
  * just push to the items answer property
  **/
export const QUESTIONS_TESTRESULT_VALUECODING = {
    positive: {
        valueCoding: {
            "system": "http://snomed.info/sct",
            "code": "TODO!",
            "display": "TODO!"
        }
    },
    negative: {
        valueCoding: {
            "system": "http://snomed.info/sct",
            "code": "TODO!",
            "display": "TODO!"
        }
    },
    pending: {
        valueCoding: {
            "system": "http://snomed.info/sct",
            "code": "TODO!",
            "display": "TODO!"
        }
    }
}

/**
 * Codings for using in questionnaire response (yes / no questions)
 * just push to the items answer property
 **/
export const QUESTIONS_YESNO = {
    yes: {
        valueBoolean: true
    },
    no: {
        valueBoolean: false
    }
}
