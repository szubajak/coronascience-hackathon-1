import Resource, {ValueCoding, CodeableConcept, Reference} from "./Resource";


class Observation extends Resource{
    status : statusObservation;
    category : CodeableConcept[];
    code : CodeableConcept;
    subject : Reference;
    valueCodeableConcept = '';
    
    constructor(_id : string, _status : statusObservation, _code : CodeableConcept){
        super(_id, 'Observation');
        this.status = _status;
        this.code = _code;
    }
}

export enum statusObservation{
    registered = 'registered',
    preliminary = 'preliminary',
    final = 'final'
}

export default Observation;