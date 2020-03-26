import Resource from "./Resource";
import { CodeableConcept } from "./Observation";

class Patient extends Resource{
    identifier : Identifier;
    active : boolean = true;
    name : HumanName[] = [];
    telecom : ContactPoint[] = [];
    gender : AdministrativeGender;
    birthDate : string = '';
    address : Address[] = [];

    constructor(_id : string, _gender : AdministrativeGender, _familyname : string ,_givenname : string ,_birthDate : string){
        super(_id, 'Patient');

        this.gender = _gender;

        let hn : HumanName = new HumanName()
        hn.family = _familyname;
        hn.given.push(_givenname);
        this.name.push(hn);

        this.birthDate = _birthDate
    }

}

export class Identifier {
    system : string = '';
    value : string = '';
    type : CodeableConcept;
}

export class HumanName {
    text : string = '';
    family : string = '';
    given : string[] = [];
    prefix : string[] = [];
}

export class ContactPoint {
    value : string = '';
    system : ContactPointSystem;
}

export class Address {
    use : AdressUse;
    text : string = '';
    line : string = '';
    city : string = '';
    district : string = '';
    state : string = '';
    postalCode : string = '';
    country : string = '';
}

export enum ContactPointSystem{
    phone = 'phone',
    fax = 'fax',
    email = 'email',
    pager = 'pager',
    url = 'url',
    sms = 'sms',
    other = 'other'
}

export enum AdministrativeGender{
    male = 'male',
    female = 'female',
    other = 'other',
    unknown = 'unknown'
}

export enum AdressUse{
    home = 'home',
    work = 'work',
    temp = 'temp',
    old = 'old',
    billing = 'billing'
}

export default Patient;