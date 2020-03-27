export default class ComponentMedication {

    didMedication: boolean;
    bodyComponentId: string;

    constructor(didMedication: boolean, bodyComponent: string) {
        this.didMedication = didMedication;
        this.bodyComponentId = bodyComponent;
    }
}