import MIDATAServiceManager, { MIDATABundle } from "./MIDATAServiceManager";
import AbstractObservationService from "./ObservationService";
import moment from "moment";
import BodyComponentSymptom from "../model/BodyComponentSymptom";
import { SYMPTOM_COMPONENTS } from "../model/SymptomComponent";
import SymptomData from "../model/SymptomData";
import * as BodyHelper from "./BodyHelper";

interface SymptomEntry {
    bodySite: any;
    valueQuantity: any;
    effectiveDateTime: any;
}

class SymptomService extends AbstractObservationService {
    
    readonly SYMPTOM_CODE = "http://snomed.info/sct|300910009";

    getObservationCode(): string {
        return this.SYMPTOM_CODE;
    }

    async getSymptomsList(userId: string, date: Date): Promise<BodyComponentSymptom[]> {
        const dateStr = moment(date).format('YYYY-MM-DD');
        const params = new Map([
            ["date", "eq" + dateStr],
            ["patient", userId]
        ]);
        const observationBundle = await this.getObservation(params);
        return this.parseSymptomsBundle(observationBundle);
    }

    async uploadSymptom(symptom: SymptomData) {
        let bodyEntries = new Array();
        for (let index = 0; index < SYMPTOM_COMPONENTS.length; index++) {
            const element = SYMPTOM_COMPONENTS[index];
            var effectiveDate = symptom.effectiveDate ? symptom.effectiveDate  : new Date();
            var nipCode = symptom.location.nipCode ? symptom.location.nipCode : "";
            var name = symptom.location.name ? symptom.location.name : "";
            bodyEntries.push(BodyHelper.buildSymptomEntry(effectiveDate,
                nipCode,
                name,
                element.code,
                element.id,
                (symptom.bodyComponentSymptom[index].intensity).toString(),
                (symptom.medications[index].didMedication).toString()));
        }
        let body = BodyHelper.buildUserSymptoms(bodyEntries);
        const responseJSON = await this.updateObservation(body);
        let success = false;
        console.log(responseJSON);
        responseJSON.entry.forEach((element: any) => {
            if ((element.response.status as String).includes('201')) {
                success = true;
            }
        });
        if(!success) {
            throw new Error("SymptomService : Upload failed. Response received :  " + JSON.stringify(responseJSON));
        } else 
            return true;
    }

    private parseSymptomsBundle(midaBundle: MIDATABundle) {
        let allSymptoms:BodyComponentSymptom[] = [];
        if (midaBundle.total > 0) {
            midaBundle.entry.forEach(entry => {
                const symptom = this.parseMidataSymptomResource(entry.resource);
                if (symptom) {
                    allSymptoms.push(symptom);
                }
            });
        }
        return allSymptoms;
    } 

    private parseMidataSymptomResource(rawData: SymptomEntry): BodyComponentSymptom | undefined {
        try {
            let bodyComponent: BodyComponentSymptom | undefined = undefined;
            if (rawData.bodySite === undefined) {
                throw 'No bodySite in symptom resource';
            }
            const bodyCode = rawData.bodySite.coding[0].code;
            SYMPTOM_COMPONENTS.forEach(symptomElmt => {
                if (symptomElmt.code === bodyCode) {
                    let id = symptomElmt.id;
                    let code = symptomElmt.code;
                    let intensity = rawData.valueQuantity.value;
                    let effectiveDate = moment(rawData.effectiveDateTime);
                    bodyComponent = new BodyComponentSymptom(id, intensity, code, effectiveDate);
                }
            });
            return bodyComponent;
        } catch (e) {
            console.warn('Error while parsing MIDATA Symptom resource :', e);
        }
        return undefined;
    }

}

export default SymptomService;
  