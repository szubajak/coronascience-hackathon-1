import Resource, {ValueCoding} from "./Resource";


class Observation extends Resource{
    private status : status;
    private category : CodeableConcept[];
    private code : CodeableConcept;
    private subject : PatientReference;
    private valueCodeableConcept = '';
    
    constructor(_id : string, _status : status, _code : CodeableConcept){
        super(_id, 'Observation');
        this.status = _status;
        this.code = _code;
    }
}

export enum status{
    registered = 'registered',
    preliminary = 'preliminary',
    final = 'final'
}

export class CodeableConcept {
    coding : Coding[] = [];
    text : string = '';
}

export class Coding {
    coding : ValueCoding[] = [];
}

export class PatientReference {
    reference : string = '';
    display : string = '';
}

export default Observation;