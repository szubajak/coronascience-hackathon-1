import Resource, {CodeableConcept, Reference, Extension} from "./Resource";

class Composition extends Resource{
    status : statusComposition;
    type : CodeableConcept;
    date : string;
    author : Reference[];
    title : string;
    section : BackboneElement[];
    
    constructor(_id : string, _status : statusComposition, _code : CodeableConcept){
        super(_id, 'Observation');
    }
}

export enum statusComposition{
    preliminary = 'preliminary',
    final = 'final',
    amended = 'amended',
    enteredInError = 'entered-in-error'
}

export class BackboneElement{
    extension? : Extension[];
    title : string = '';
    entry? : Reference[];
}

export default Composition;