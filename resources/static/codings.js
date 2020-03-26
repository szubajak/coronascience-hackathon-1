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
    ],
    text: 'Symptom severity (finding)'
  },
  mild: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '255604002',
        display: 'Mild (qualifier value)'
      }
    ],
    text: 'Symptom severity (finding)'
  },
  moderate: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '6736007',
        display: 'Moderate (severity modifier) (qualifier value)'
      }
    ],
    text: 'Symptom severity (finding)'
  },
  severe: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '24484000',
        display: 'Severe (severity modifier) (qualifier value)'
      }
    ],
    text: 'Symptom severity (finding)'
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
        code: 'TODO!',
        display: 'TODO!'
      }
    ]
  },
  throatPain: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: 'TODO!',
        display: 'TODO!'
      }
    ]
  },
  dyspnea: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: 'TODO!',
        display: 'TODO!'
      }
    ]
  },
  headache: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: 'TODO!',
        display: 'TODO!'
      }
    ]
  },
  diarrhea: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: 'TODO!',
        display: 'TODO!'
      }
    ]
  },
  nausea: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: 'TODO!',
        display: 'TODO!'
      }
    ]
  },
  anosmia: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: 'TODO!',
        display: 'TODO!'
      }
    ]
  }
}

/**
 * HL7 codings for recource category.
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
  ]
}
