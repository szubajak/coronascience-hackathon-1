import Moment from 'moment';
import Symptom from './Symptom';
import IClonable from './IClonable';

export default class BodyComponentSymptom implements IClonable<BodyComponentSymptom> {

    id: string;
    intensity: number;
    code: string;
    effectiveDate:  Moment.Moment | undefined;

    constructor(id: string, intensity: number, code: string, effectiveDate: Moment.Moment | undefined = undefined ) {
        this.id = id;
        this.intensity = intensity;
        this.code = code;
        this.effectiveDate = effectiveDate;
    }

    clone(): BodyComponentSymptom {
        return new BodyComponentSymptom(this.id, this.intensity, this.code, this.effectiveDate);
    }

    setEffectiveDate(effectiveDate: Moment.Moment) {
        this.effectiveDate = effectiveDate;
    }

}