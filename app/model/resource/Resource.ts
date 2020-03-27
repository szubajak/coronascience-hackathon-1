export class Resource{
    resourceType : string;
    id : string;
    meta ?: Meta;
    extension? : Extension[];

    constructor(_resourceType : string, _id : string){
        this.resourceType = _resourceType;
        this.id = _id;
    }

}

export class Meta {
    versionId : string = '';
    lastUpdated : string = '';
    extention : Extension[] = [];
}

export class Extension {
    url : string = '';
    valueCoding : ValueCoding = new ValueCoding();
    valueReference : ValueReference = new ValueReference();
    valueString : string = '';
    extension : Extension[] = [];
}

export class ValueCoding {
    system : string = '';
    code : string = '';
    display : string = '';
}

export class ValueReference {
    reference : string = '';
    display : string = '';
}

export class ValueQuantity {
    value : string = '';
    unit : string = '';
    system : string = '';
    code : string = '';
}

export class CodeableConcept {
    coding : Coding[] = [];
    text : string = '';
}

export class Coding {
    coding : ValueCoding[] = [];
}

export class Reference {
    reference : string = '';
    display : string = '';
}

export default Resource;