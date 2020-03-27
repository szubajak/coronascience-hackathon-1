import Resource, {ValueCoding, CodeableConcept, Reference} from "./Resource";


class Observation extends Resource{
    private status : statusObservation;
    private category : CodeableConcept[];
    private code : CodeableConcept;
    private subject : Reference;
    private valueCodeableConcept = '';
    
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