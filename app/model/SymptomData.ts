import BodyComponentSymptom from "./BodyComponentSymptom";
import UserLocation from "./UserLocation";
import ComponentMedication from "./ComponentMedication";
import { SYMPTOM_COMPONENTS } from "./SymptomComponent";

export default class SymptomData {

    effectiveDate: Date | undefined;
    bodyComponentSymptom: Array<BodyComponentSymptom>;
    location: UserLocation;
    medications: Array<ComponentMedication>;

    constructor() {
        // Default bodycomponents and medication:
        this.bodyComponentSymptom = [];
        this.medications = [];
        SYMPTOM_COMPONENTS.forEach(component => {
            let bodycomponent = new BodyComponentSymptom(component.id, 0, component.code);
            this.bodyComponentSymptom.push(bodycomponent);
            let medication = new ComponentMedication(false, bodycomponent.id);
            this.medications.push(medication);
        });
        // Default userLocation :
        this.location = new UserLocation();
        // Default effective date :
        this.effectiveDate = undefined;
    }

    setComponentSymptomIntensity(updatedComponentId: string, intensity: number) {
        let bodyComponents: BodyComponentSymptom[] = [];
        this.bodyComponentSymptom.forEach(component => {
            if (updatedComponentId === component.id) {
                let newComponent = component.clone();
                newComponent.intensity = intensity;
                bodyComponents.push(newComponent);
            } else {
                bodyComponents.push(component);
            }
        });
        this.bodyComponentSymptom = bodyComponents;
    }

    setUserLocation(userlocation: UserLocation) {
        this.location = new UserLocation(userlocation);
    }
    setComponentMedication (medications: Array<ComponentMedication>) {
        this.medications = medications;
    }
    setEffectiveDate(date: Date) {
        this.effectiveDate = new Date(date);
    }
    resetAllComponentSymptoms() {
        let bodyComponents: BodyComponentSymptom[] = [];
        this.bodyComponentSymptom.forEach(component => {
            let newComponent = component.clone();
            newComponent.intensity = 0;
            bodyComponents.push(newComponent);
        });
        this.bodyComponentSymptom = bodyComponents;
    }
}