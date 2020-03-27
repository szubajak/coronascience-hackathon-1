import StringHelper from '../helpers/StringHelpers';
import UserLocation from '../model/UserLocation';
import UserProfile from '../model/UserProfile';

const DELETED_STATUS = 'entered-in-error';

export const buildSymptomEntry = (effectiveDateTime: Date,
        zipcode: string, locality: string, code: string, display: string, value: string, medication: string) => {
    let body = {
        request: {
            method: 'POST',
            url: 'Observation'
        },
        resource: {
            resourceType: 'Observation',
            status: 'preliminary',
            code: {
                coding: [
                    {
                        system: 'http://snomed.info/sct',
                        display: 'Allergy to pollen',
                        code: '300910009'
                    }
                ]
            },
            category: [
                {
                    coding: [
                        {
                            system: 'http://hl7.org/fhir/observation-category',
                            display: 'Survey',
                            code: 'survey'
                        }
                    ]
                }
            ],
            bodySite: {
                coding: [
                    {
                        system: 'http://snomed.info/sct',
                        code: code,
                        display: display
                    }
                ]
            },
            effectiveDateTime: effectiveDateTime.toISOString(),
            extension: [
                {
                url: 'http://midata.coop/Extensions/event-location',
                extension : [
                    {
                    url : 'zipcode',
                    valueCode: zipcode
                    },
                    {
                        url : 'locality',
                        valueString: locality
                    }
                ]
                },
                {
                url : 'http://midata.coop/Extensions/treated',
                valueBoolean : medication
                }
            ],
            valueQuantity: {
                value: value
            }
        }
    };
    return body;
};

export const buildUserSymptoms = (entries: Array<any>) => {
    let body = {
        resourceType: 'Bundle',
        id: 'bundle-transaction',
        type: 'transaction',
        entry: entries
    };

    return JSON.stringify(body);
};

export const buildUserMainLocation = (code: string, effectiveDateTime: string = '',
                                    resourceId: string|undefined = undefined, versionId: string = '0') => {

    if (!code && code.length === 0) {
        throw new Error('Code is mandatory on build profile');
    }

    code = code.toLowerCase();
    let codeDisplay = StringHelper.capitalizeFirstLetter(code);
    let body: any = {
        resourceType: 'Observation',
        status: 'preliminary',
        code: {
            coding: [
                {
                    system: 'http://midata.coop',
                    display: 'Main Occupation Location Type',
                    code: 'main-occupation-location'
                }
            ]
        },
        category: [
            {
                coding: [
                    {
                        system: 'http://hl7.org/fhir/observation-category',
                        display: 'Survey',
                        code: 'survey'
                    }
                ]
            }
        ],
        valueCodeableConcept: {
            coding: [
            {
                system: 'http://midata.coop/codesystems/main-occupation-location-type',
                display: codeDisplay,
                code: code
            }]
        },
        effectiveDateTime: effectiveDateTime
    };
    if (resourceId !== undefined) {
        body.id = resourceId;
        body.meta = {
                versionId: versionId
        };
    }

    return JSON.stringify(body);
};

export const buildUserAirPurificatorBody = (value: string,
    effectiveDateTime: string = '', resourceID: string | undefined = undefined, versionId: string = '0') => {

    if (!value && value.length === 0) {
        throw new Error('Value is mandatory on build profile');
    }

    value = value.toLowerCase();
    let codeDisplay = StringHelper.capitalizeFirstLetter(value);
    let body;

    if (resourceID === undefined) {
        body = {
            resourceType: 'Observation',
            status: 'preliminary',
            code: {
                coding: [
                    {
                        system: 'http://midata.coop/codesystems/specific',
                        display: 'Person owns air purificator',
                        code: 'air-purifier'
                    }
                ]
            },
            category: [
                {
                    coding: [
                        {
                            system: 'http://hl7.org/fhir/observation-category',
                            display: 'Survey',
                            code: 'survey'
                        }
                    ]
                }
            ],
            valueCodeableConcept: {
                coding: [{
                    system: 'http://midata.coop/codesystems/specific',
                    display: codeDisplay,
                    code: value
                }]
            },
            effectiveDateTime: effectiveDateTime
        };
    } else {
        body = {
            resourceType: 'Observation',
            id: resourceID,
            status: 'preliminary',
            code: {
                coding: [
                    {
                        system: 'http://midata.coop/codesystems/specific',
                        display: 'Person owns air purificator',
                        code: 'air-purifier'
                    }
                ]
            },
            category: [
                {
                    coding: [
                        {
                            system: 'http://hl7.org/fhir/observation-category',
                            display: 'Survey',
                            code: 'survey'
                        }
                    ]
                }
            ],
            meta: {
                versionId: versionId
            },
            valueCodeableConcept: {
                coding: [{
                    system: 'http://midata.coop/codesystems/specific',
                    display: codeDisplay,
                    code: value
                }]
            },
            effectiveDateTime: effectiveDateTime
        };

    }

    return JSON.stringify(body);
};

export const buildUserHomeLocationBody = (userLocation: UserLocation) => {

    let locationDisplay = '';
    let code = userLocation.nipCode;
    let status = 'preliminary';
    if (!userLocation.isLocationReset()) {
        locationDisplay = userLocation.nipCode + ' ' + userLocation.name;
    } else {
        status = DELETED_STATUS;
    }
    let body: any = {
        resourceType: 'Observation',
        status: status,
        code: {
            coding: [
                {
                    system: 'http://midata.coop',
                    display: 'Living Location',
                    code: 'living-location'
                }
            ]
        },
        category: [
            {
                coding: [
                    {
                        system: 'http://hl7.org/fhir/observation-category',
                        display: 'Survey',
                        code: 'survey'
                    }
                ]
            }
        ],
        valueCodeableConcept: {
            coding: [{
                system: 'http://midata.coop/codesystems/zipcode',
                display: locationDisplay,
                code: code
            }]
        }
    };
    if (userLocation.id !== undefined) {
        body.id = userLocation.id;
        body.meta = {
            versionId: userLocation.version
        };
    }
    return JSON.stringify(body);
};

export const buildUserAllergy = (patientId: string, verificationStatus: string, code: string, display: string,
    effectiveDateTime: string = '', resourceID: string = '', versionId = '') => {

    if (!patientId && patientId.length === 0) {
        throw new Error('PatientId is mandatory on build profile');
    }

    let resourceBody;
    if (resourceID === '' || resourceID === undefined) {
        resourceBody = {
            request: {
                method: 'POST',
                url: 'AllergyIntolerance'
            },
            resource: {
                resourceType: 'AllergyIntolerance',
                id: resourceID,
                verificationStatus: verificationStatus,
                patient: {
                    reference: `Patient/${patientId}`
                },
                code: {
                    coding: [
                        {
                            system: 'http://snomed.info/sct',
                            display: display,
                            code: code
                        }
                    ]
                },
                category: [
                    'environment'
                ],
                assertDate: effectiveDateTime
            }
        };
    } else {
        resourceBody = {
            request: {
                method: 'PUT',
                url: `AllergyIntolerance/${resourceID}`
            },
            resource: {
                resourceType: 'AllergyIntolerance',
                id: resourceID,
                verificationStatus: verificationStatus,
                patient: {
                    reference: `Patient/${patientId}`
                },
                code: {
                    coding: [
                        {
                            system: 'http://snomed.info/sct',
                            display: display,
                            code: code
                        }
                    ]
                },
                meta: {
                    versionId: versionId
                },
                category: [
                    'environment'
                ],
                assertDate: effectiveDateTime
            }
        };
    }

    return resourceBody;
};

export const buildBundleAllergy = (entries: Array<any>) => {
    let body = {
        resourceType: 'Bundle',
        id: 'bundle-transaction',
        type: 'transaction',
        entry: entries
    };

    return body;
};

export const buildPatientLanguage = (user: UserProfile, newLang: string) => {
    return JSON.stringify({
            'resourceType': 'Patient',
            'id': user.id,
            'meta': {
                'versionId': user.versionId
            },
            'communication': [
                {
                    'language': {
                        'coding': [
                            {
                                'code': newLang
                            }
                        ]
                    },
                    'preferred': true
                }
            ]
    });
};